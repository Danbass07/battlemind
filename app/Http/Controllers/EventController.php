<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
use App\Group;
use App\Event;

use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
       
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $group= Group::findOrFail($request->group_id);
        $event = $group->events->where('active','=',true)->first();
        if (!$event) {
            $event = new Event;
            $event = Event::create([
                'data' => $request->data,
                'group_id' => $request->group_id,
                'active' => true,
           
            ]);
            $event = $group->votes->where('active','=',true)->first();
            }
        
    
           
        return response()->json([
            'activeEventDetails' => $event,
             ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function getActiveEvent($group_id)
    {
        $group= Group::findOrFail($group_id);
        $event = $group->events->where('active','=',true)->first();
        return response()->json([
            'activeEventDetails' => $event,
             ]);
    }
    public function updateActiveEvent(Request $request, $group_id)
    {
        $group= Group::findOrFail($group_id);
        $event = $group->events->where('active','=',true)->first();
        $event->data = $request->data;
        $event->save();
        return response()->json([
            'activeEventDetails' => $event,
             ]);
    }
    public function closeActiveEvent($group_id)
    {
        $group= Group::findOrFail($group_id);
        $event = $group->events->where('active','=',true)->first();
        $event->active = false;
        $event->save();
        return response()->json([
            'activeEventDetails' => $event,
             ]);
    }
    public function updateTableDetails(Request $request, $group_id)
    {
        $group= Group::findOrFail($group_id);
        $event = $group->events->where('active','=',true)->first();
       $event->data =  json_decode($event->data );
        $newData= $event->data;
        $tableInfo = (object) $request->tableInfo;
   
        $newData[$tableInfo->tableNumber] = $tableInfo;
   
        $event->data = $newData;
        
    
     $event->data = json_encode($event->data);
     
         $event->save();

        return response()->json([
            'activeEventDetails' => $event,
             ]);
    }
    public function bookTable(Request $request, $group_id) {
        $group= Group::findOrFail($group_id);
        $event = $group->events->where('active','=',true)->first();
        $event->data =  json_decode($event->data );
        $newData= $event->data;
        $tableInfo = (object) $request->tableInfo;
   
            
        foreach ($newData as $table) {
            if ($table->type === "empty") {
               
                $emptyTableIndex = $table->tableNumber;
             
            }
            Log::info($emptyTableIndex);  
        }
        $newData[$emptyTableIndex] = $tableInfo;
        $newData[$emptyTableIndex]->tableNumber = $emptyTableIndex;
        $event->data = $newData;
    
     $event->data = json_encode($event->data);
     
         $event->save();
         return response()->json([
            'activeEventDetails' => $event,
            'tableInfo' => $newData[$emptyTableIndex],
             ]);
    }
}

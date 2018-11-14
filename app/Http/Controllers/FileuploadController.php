<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\ImageServiceProviderLaravel5\Image;
use App\Fileupload;

class FileuploadController extends Controller
{
    public function store(Request $request) {
      
        if($request->get('file'))
           {
             //  $image = $request->get('file');
             //  $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
               //Image::make($request->get('file'));
               //->save(public_path('storage/').$name);
           //   $request->file('file')
              //->store('files');
            //  $image = $request->get('file');
             //->store('avatars');
             // $fileupload = new Fileupload();
             // $fileupload->filename=$name;
             // $fileupload->save();
              //$path = $request->file('file');
              //->save('files');

              //return $path;
               return response()->json($image);
            }
    
            
    
            return response()->json('Not added');
      
       }
}

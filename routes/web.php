<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::resource('/players', 'PlayerController');
Route::resource('/leagues', 'LeagueController');
Route::get('/players/{id}/addWin/{pid}', 'PlayerController@addWin');
Route::get('/players/{id}/addLost/{pid}', 'PlayerController@addLost');
Route::get('/players/{id}/addDraw/{pid}', 'PlayerController@addDraw');
Route::get('/players/{id}/addResult/{pid}/{category}/{action}', 'PlayerController@addResult');
Route::resource('/scoreboard', 'ScoreboardController');
Route::get('/leagues/{id}/addPlayer/{pid}', 'LeagueController@addPlayer');
Route::get('/leagues/{id}/removePlayer/{pid}', 'LeagueController@removePlayer');

Route::get('/leagues/{id}/getResults', 'LeagueController@getResults');
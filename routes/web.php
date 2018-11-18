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
Route::resource('/scoreboards', 'ScoreboardController');
Route::resource('/types', 'TypeController');

Route::get('/players/{id}/addResult/{pid}/{category}/{action}', 'PlayerController@addResult');
Route::get('/scoreboards/{id}/addResult/{pid}/{category}/{action}', 'ScoreboardController@addResult');


Route::get('/leagues/{id}/addPlayer/{pid}', 'LeagueController@addPlayer');
Route::get('/leagues/{id}/removePlayer/{pid}', 'LeagueController@removePlayer');

Route::get('/scoreboards/{id}/addPlayer/{pid}', 'ScoreboardController@addPlayer');
Route::get('/scoreboards/{id}/removePlayer/{pid}', 'ScoreboardController@removePlayer');

Route::get('/leagues/{id}/getResults', 'LeagueController@getResults');

Route::resource('fileupload', 'FileuploadController');
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


Route::get('/players/{id}/addResult/{pid}/{category}/{action}', 'PlayerController@addResult');
Route::get('/players/{id}/friendsContent', 'PlayerController@friendsContent');


Route::get('/leagues/{id}/addPlayer/{pid}', 'LeagueController@addPlayer');
Route::get('/leagues/{id}/removePlayer/{pid}', 'LeagueController@removePlayer');
Route::get('/leagues/{id}/getResults', 'LeagueController@getResults');
Route::get('/leagues/{id}/friendsContent', 'LeagueController@friendsContent');

Route::get('/scoreboards/{id}/addResult/{pid}/{category}/{action}', 'ScoreboardController@addResult');
Route::post('/scoreboards/{id}/updateResults', 'ScoreboardController@updateResults');
Route::get('/scoreboards/{id}/addPlayer/{pid}', 'ScoreboardController@addPlayer');
Route::get('/scoreboards/{id}/removePlayer/{pid}', 'ScoreboardController@removePlayer');
Route::get('/scoreboards/{id}/friendsContent', 'ScoreboardController@friendsContent');


Route::resource('/fileupload', 'FileuploadController');

Route::resource('/users', 'UserController');



Route::resource('/groups', 'GroupController');
Route::get('/groups/{id}/addUser', 'GroupController@addUser');
Route::get('/groups/{id}/removeUser', 'GroupController@removeUser');
Route::put('/groups/{id}/toggleActiveUser/{cid}', 'GroupController@toggleActiveUser');

Route::resource('/types', 'TypeController');
Route::get('/types/{typeid}/addToTheGroup/{groupid}','TypeController@addToTheGroup' );
Route::get('/types/hypecheck/{id}', 'TypeController@hypecheck');
Route::get('/types/{id}/userTypes','TypeController@userTypes' );


 Route::post('/hype/hypenotizer', 'HypeController@hypenotizer');
 Route::post('/vote/setUpVote', 'VoteController@setUpVote');
 
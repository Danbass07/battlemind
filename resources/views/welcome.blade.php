<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <style>
            html, body {
                background-color: black;
                color: #ff7f00;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
                min-width: 500px;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                margin-top:20%;
                font-size: 84px;
            }

            .links > a {
                background-color: #ff7f00;
                padding: 20px;
                font-size: 22px;
                font-weight: 800;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
                margin: 60px 50px;
                border-radius: 35%;
            }

            .m-b-md {
                margin-bottom: 30px;
            }
            .info-banner {
                margin: 100px 100px;
                font-size: 24px;
            }
        </style>
    </head>
    <body>
        <div class="main-wrapper">
  

            <div class="content">
                <div class="title m-b-md">
                    Welcome to the Battlemind
                </div>

                      @if (Route::has('login'))
                        <div class="top-right links">
                            @auth
                                <a href="{{ url('/home') }}">Home</a>
                            @else
                                <a href="{{ route('login') }}">Login</a>
                                <a href="{{ route('register') }}">Register</a>
                            @endauth
                        </div>
                    @endif
                <div class="info-banner">
                    Web Application for table top players and Clubs/ Groups
                    they belong to. App will join all of you with local/online shops.
                    Your activity will help them to supply you will all you need. We 
                    will help them to survive on market. And of course we will choose shop 
                    willing to support us. We all love discounts reward's and shop tournaments.
                </div>
            </div>
        </div>
    </body>
</html>

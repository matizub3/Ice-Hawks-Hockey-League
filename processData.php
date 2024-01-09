<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title> Login Page </title>
    <style>
        h2, h1, h3, p {
            text-align: center;
            margin-bottom: 50px;
        }

        .nav-php-logo {
            margin-top: 5px;
            margin-left: 8%;
        }

        .welcome {
            margin-top: clamp(10%, 100px, 100px);
        }

        .welcome-text {
            margin: 0 12%;
        }
    </style>
</head>

<body>
<header>
        <a href="index.html" class="nav-branding nav-php-logo"><img src="./images/hockeylogo.png" width="80px" height="60px"></a></li>
        <nav class="navbar">
            <ul class="nav-menu">
                <li class="nav-link"><a href="membership.php">MEMBERSHIP</a></li>
                <li class="nav-link"><a href="teams.html">TEAMS</a></li>
                <li class="nav-link"><a href="camps.html">CAMPS</a></li>
                <li class="nav-link"><a href="stats.html">STATS</a></li>
                <li class="nav-link"><a href="app.html">APPAREL</a></li>
                <li class="nav-link"><a href="coach.html">COACHES</a></li>
                <li class="nav-link"><a href="contacts.html">CONTACTS</a></li>
            </ul>
        </nav>
    </header>
    <div class="hamburger">
        <input type="checkbox", class="hamburger-check">
        <button><img src="images/hamburger-menu.svg" alt=""></button>
        <ul class="menu">
            <div class="hamburger-links">
                <li><a href="./index.html"><img src="./images/hockeylogo.png" class="nav-logo"></a></li>
                <li class="nav-link"><a href="membership.php">MEMBERSHIP</a></li>
                <li class="nav-link"><a href="teams.html">TEAMS</a></li>
                <li class="nav-link"><a href="camps.html">CAMPS</a></li>
                <li class="nav-link"><a href="stats.html">STATS</a></li>
                <li class="nav-link"><a href="app.html">APPAREL</a></li>
                <li class="nav-link"><a href="coach.html">COACHES</a></li>
                <li class="nav-link"><a href="contacts.html">CONTACTS</a></li>
            </div>
        </ul>
    </div>
<?php

    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $emergencyContact = $_POST["emergencyContact"];
    $parentEmail = $_POST["parentEmail"];
    $age = $_POST["age"];
    $coachingPackage;

    $coaching = $_POST["coachingPackage"];

    if($coaching == "standard"){
        $coachingPackage = false;
    } else {
        $coachingPackage = true;
    }

    echo "<div class='welcome'>";
    echo "<h1>" . "Welcome to the League, " . $firstName . "</h1>";
    echo "</div>";

    if($coachingPackage){
        echo "<p class='welcome-text'> Thank you for choosing our Premium Hockey Coaching Package! We're excited to elevate your youth hockey experience with extended ice time, personalized 1 on 1 coaching, and exclusive access to additional resources. Our dedicated coaching team is committed to helping you reach your goals on the ice. Get ready for a season of skill development, confidence building, and unparalleled support. Welcome to an enhanced level of hockey excellence! </p>";
    } else {
        echo "<p class='welcome-text'> Thank you for choosing the Ice Hawks' Standard Coaching Package! We're delighted to welcome your child to a season of fun, growth, and camaraderie. Our coaching team is dedicated to fostering a positive environment for skill development and teamwork. As the season progresses, please keep in mind that upgrading to our Premium Package is always a possibility for additional benefits. Here's to a fantastic hockey journey with the Ice Hawks! </p><br><br>";
    }

    echo "<p class='welcome-text'> We sent an email to " . $parentEmail . " for further information about tryout times, open skating discounts, and confirming your email. </p>";
    

    $server = "localhost";// your server
    $userid = "utzvfuctgz0c3"; // your user id
    $pw = "tbcE%1^%hbP#"; // your pw
    $db= "dbxge5z8co6rq2"; // your database
		
    // Create connection
    $conn = new mysqli($server, $userid, $pw);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $conn->select_db($db);

	    //run a query
    $sql = "INSERT INTO members (firstName, lastName, age, emergencyPhone, parentEmail, premiumCoaching) VALUES ('$firstName', '$lastName', '$age', '$emergencyContact', '$parentEmail', '$coachingPackage')";
    
    $conn->query($sql);
    
    $conn->close();
?>
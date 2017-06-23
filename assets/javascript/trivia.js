$(document).ready(function() {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax(); // function for MaterializeCSS parallax componenet
    $('.tooltipped').tooltip({ // delay function for button tool tips
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function() { // fade in page elements
        // fadeIn function
    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    var congratsMessages = ['Pretty good for a homeosapien!', 'Running with the Big Dinos now!', "A true scientist!"];

    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomNum(congratsMessages.length);
    }

    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        // question 1
        {
            "q": "Medullary bones are found in...?",
            "c": ["Pregnant T Rex bones found in Hell Creek, Montana.", "A mastadon tusk fossil unearthed in Greece in 1975.", "Only humans silly, everyone knows that..."],
            "answer": 0
        },
        // question 2
        {
            "q": "In the April 2007 issue of Science magazine, 7 scientists reported finding what in B. Rex?",
            "c": ["DNA", "Collagen", "Undigested food"],
            "answer": 1
        },
        // question 3
        {
            "q": "What animals are living dinosaurs today?",
            "c": ["Kangaroos", "Snakes", "Birds"],
            "answer": 2
        },
        // question 4
        {
            "q": "What was the name of the dinosaur expert for the movie Jurrassic Park?",
            "c": ["Dr John Hammond", "Jack Horner", "Dr Ian Malcolm"],
            "answer": 1
        },
        // question 5
        {
            "q": "Which is the largest dinosaur ever discovered?",
            "c": ["Tyrannosaurus Rex", "Argentinosaurus", "Spinosaurus"],
            "answer": 1
        },
        // question 6
        {
            "q": "Scientists estimate that the Jurrassic period lasted for _________ years.",
            "c": ["30 billion", "64 million", "1 billion"],
            "answer": 1
        },
        // question 7
        {
            "q": "Field of science which uses fossils to study life throughout geologic time?",
            "c": ["Anthropology", "Paleontology", "Archaeology"],
            "answer": 1
        },
        // question 8
        {
            "q": "Which dinosaur never existed?",
            "c": ["Oviraptor", "Stegosaurus", "Brontosaurus"],
            "answer": 2
        },
        // question 9
        {
            "q": "This dinosaur was a meat eater:",
            "c": ["Spinosaurus", "Triceratops", "Riojasaurus"],
            "answer": 0
        },
        // question 10
        {
            "q": "What's the most amount of money dinosaur fossils have sold for at auction",
            "c": ["$54,000", "$1.1billion", "$8.3million"],
            "answer": 2
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); // the conditional successfully loops the game
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); // stored as a string not a number
            userChoice = parseInt(userChoice);

            // checks if user is correct and will tally accordingly
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});

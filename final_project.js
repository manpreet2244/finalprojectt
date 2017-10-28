(function($, Handlebars) {
    "use strict";

    
    var request = $.getJSON("final_project.json");

    var Quiz = {
        
        currentIndex: 0,

        
        currentScore: 0,

        config: {},

        init: function(config) {
            this.config = config;

            
            request.done(function(questions) {
                
                if (Quiz.currentIndex + 1 > questions.length) {
                    Quiz.renderFinalScore(Quiz.config.finalScoreTemplateEl, questions);
                } else {
                    Quiz.renderTitle(Quiz.config.titleTemplateEl, questions);
                    Quiz.renderChoices(Quiz.config.choicesTemplateEl, questions);   
                }
            });
        },

        renderTitle: function(titleTemplateEl, questions) {
            
            var template = Handlebars.compile($(titleTemplateEl).html());

            var context = {
                title: questions[Quiz.currentIndex].title
            };

            
            $(Quiz.config.questionTitleEl).html(template(context));
        },

        renderChoices: function(choicesTemplateEl, questions) {
            var template = Handlebars.compile($(choicesTemplateEl).html());

            var context = {
                choices: questions[Quiz.currentIndex].choices
            };

            
            $(Quiz.config.choicesEl).html(template(context));
        },

        handleQuestion: function(event) {
            // Just so I don't have to type the same thing again
            var questions = event.data.questions;
            var correctAnswer = questions[Quiz.currentIndex].correctAnswer;
            var userInput = $("input[name=choices]:checked").val();

            if (parseInt(userInput, 10) === correctAnswer) {
                Quiz.currentScore += 1;
            }

            
            Quiz.currentIndex += 1;
            Quiz.init(Quiz.config);
        },

        renderFinalScore: function(finalScoreTemplate, questions) {
            var template = Handlebars.compile($(finalScoreTemplate).html());
            var context = {
                totalScore:      Quiz.currentScore,
                questionsLength: questions.length   
            };

            $(Quiz.config.quizEl).html(template(context));
        }
    };


    
    Quiz.init({
        choicesTemplateEl:      "#choices-template",
        titleTemplateEl:        "#title-template",
        questionTitleEl:        "#question-title",
        choicesEl:              "#choices",
        finalScoreTemplateEl:   "#finalScore-template",
        quizEl:                 "#quiz",
    });

    
    request.done(function(questions) {
        
        $("#next").on("click", {questions: questions}, Quiz.handleQuestion);

    });
})(jQuery, Handlebars);

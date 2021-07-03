$(document).ready(function(){
    var quizData = [];

    function renderQuizQuestion(data) {
// /* <section>
//             <h3>Which was not one of Voldemort's Horcruxes?</h3>
//              <label class="option-wrapper">
//                  <input type="radio" name="q1" value="1"/>
//                  <span>Option One</span>
//              </label>
//              <label class="option-wrapper">
//                 <input type="radio" name="q2" value="2"/>
//                 <span>Option Two</span>
//             </label>
//             <label class="option-wrapper">
//                 <input type="radio" name="q3" value="3"/>
//                 <span>Option Three</span>
//             </label>
//             <label class="option-wrapper">
//                 <input type="radio" name="q4" value="4"/>
//                 <span>Option Four</span>
//             </label>
// </section> */
        var section = $("<section>").addClass("each_ques_wrapper");
        var question = $("<h3>").html(data.question);
        section.append(question);

        for(var i=0; i<data.options.length; i++){
            var optionWrapper = $("<label>").addClass("option-wrapper")
            var input = $("<input>").attr("type","radio").attr("name", "q" + data.id).attr("value", (i+1)).attr("required","true").
            attr("id", "q" + data.id + "-" + (i+1))
            var label = $("<span>").html(data.options[i])

            optionWrapper.append(input,label);
            section.append(optionWrapper);
        }

        $("#quiz-form").append(section);
    }

    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz",function(responce) {
        quizData = responce;
        console.log(responce);
        for(var i=0; i<responce.length; i++){
            renderQuizQuestion(responce[i])
            
        }

        var submitSection = $("<section>");
        submitSection.addClass("submit_section");
        $("#quiz-form").append(submitSection);
        submitSection.append($("<input>").attr("type","submit").attr('id',"sbm_btn"));
    });

    $("#quiz-form").submit(function(e) {
        e.preventDefault();

        var result = {};
        var radioButtons = $(".option-wrapper input");
        for(var i=0; i<radioButtons.length; i++){
            if(radioButtons[i].checked) {
                console.log(radioButtons[i]);
                result[radioButtons[i].name] = radioButtons[i].value
                }
        }

        var score = 0;
        for(var j=0; j<quizData.length; j++){
            var key = "q" + quizData[j].id;
            var selector = "#"+(key+"-"+result[key]) + "+ span"
            if(result[key] == quizData[j].answer) {
                score++;
                $('#score').html(score);
                $(selector).html($(selector).html() + " [CORRECT]")  
            } 
            else{
                var correctOptionSelector = "#"+(key+"-"+quizData[j].answer) + "+ span";
                $(correctOptionSelector).html($(correctOptionSelector).html() + " [CORRECT]")
                $(selector).html($(selector).html() + " [INCORRECT]")
            }
        }

    })
});
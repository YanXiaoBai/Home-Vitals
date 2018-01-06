$(document).ready(function() {
    var symptomList = new Array();
    var nowState = 0; //0时机动按钮为添加症状 1时机动按钮为保存症状
    $(".input_new").hide();
    $(".add_new").click(function() {
        console.log("click");
        if (nowState == 1) {
            symptomList.push(document.getElementById("input_list").value);
            $(".input_new").before("<div class='now_symptom'>" + document.getElementById("input_list").value + "</div>")
            document.getElementById("input_list").value = "";
            $(".input_new").hide();
            nowState = 0;
            $(".add_new").empty();
            $(".add_new").append("Add a new symptom...");
        } else {
            $(".input_new").show();
            nowState = 1;
            $(".add_new").empty();
            $(".add_new").append("Click me to add");
        }
    });
    $("#finding_page").hide();
    $(".submit").click(function() {
        $("#finding_page").show();
        $("#search_page").hide();
        // for(var i=0;i<symptomList.length;i++)
        // 	console.log(symptomList[i]);
        
        function linkOfSymptom(numOfMatch, indexInJSON) {
            this.numOfMatch = numOfMatch;
            this.indexInJSON = indexInJSON;
        }

        function losCompare(a, b) {
            return (-(a.numOfMatch - b.numOfMatch));
        }
        var listOfDisease;
        var listOfCompare=new Array();
        $.ajax({
            url: "data.json",
            async: false,
            success: function(data, status) {
                listOfDisease = eval("(" + data + ")");
            }
        });
        for(var i=0;i<listOfDisease.numOfDisease;i++)
        {
        	listOfCompare.push(new linkOfSymptom(0,i));
        }
        for(var i=0;i<symptomList.length;i++)
        {
        	for(var j=0;j<listOfDisease.numOfDisease;j++){
        		
        	}
        }
    });
});
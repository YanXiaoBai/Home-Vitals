$(document).ready(function() {
    var symptomList = new Array();
    var nowState = 0; //0时机动按钮为添加症状 1时机动按钮为保存症状
    $(".input_new").hide();
    $(".add_new").click(function() {
        if (nowState == 1) {
            document.getElementById("input_list").value = document.getElementById("input_list").value.toLowerCase();
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

        function linkOfSymptom(numOfMatch, indexInJSON) {
            this.numOfMatch = numOfMatch;
            this.indexInJSON = indexInJSON;
        }

        function losCompare(a, b) {
            return (-(a.numOfMatch - b.numOfMatch));
        }
        var listOfDisease;
        var listOfCompare = new Array();
        $.ajax({
            url: "data.json",
            async: false,
            success: function(data, status) {
                listOfDisease=data;
            }
        });
        for (var i = 0; i < listOfDisease.numOfDisease; i++) {
            listOfCompare.push(new linkOfSymptom(0, i));
        }
        for (var i = 0; i < symptomList.length; i++) {
            for (var j = 0; j < listOfDisease.numOfDisease; j++) {
                for (var k = 0; k < listOfDisease.diseaseList[j].numOfSymptom; k++) {
                    if (symptomList[i] == listOfDisease.diseaseList[j].symptom[k]) {
                        listOfCompare[j].numOfMatch++;
                    }
                }
            }
        }
        for(i=0;i<listOfCompare.length;i++){
        	console.log("!")
        	if(listOfCompare[i].numOfMatch==0){
        		break;
        	}
        	$(".rest").append("<div class='answer'><div class='name'>"+listOfDisease.diseaseList[listOfCompare[i].indexInJSON].name+"</div><div class='description'>Description:"+listOfDisease.diseaseList[listOfCompare[i].indexInJSON].description+"</div><div class='symptom'>Symptom:"+listOfDisease.diseaseList[listOfCompare[i].indexInJSON].symptom.toString()+"</div><div class='solution'>Solution:"+listOfDisease.diseaseList[listOfCompare[i].indexInJSON].solution+"</div></div>")
        }
        // for (i = 0; i < listOfCompare.length; i++) {
        //     console.log(listOfCompare[i].indexInJSON);
        // }
        // listOfCompare.sort(losCompare);
        // for (i = 0; i < listOfCompare.length; i++) {
        //     console.log("{"+listOfCompare[i].indexInJSON.toString()+" "+listOfCompare[i].numOfMatch.toString()+"}");
        // }
    });
});
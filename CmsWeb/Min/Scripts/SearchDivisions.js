$(function(){$("#clear").click(function(){$("input:text").val("")}),$("#name").focus(),$("#search").click(function(n){return n.preventDefault(),$.getTable(),!1}),$(".bt").button(),$.getTable=function(){var n=$("#results").closest("form"),t=n.serialize();return $.post($("#search").attr("href"),t,function(n){$("#results").replaceWith(n).ready($.formatTable)}),!1},$("#close").click(function(){window.parent.$("#divisionsDialog").dialog("close")}),$.formatTable=function(){$("td.tooltip").tooltip({showURL:!1,showBody:"|"}),$("#results > tbody > tr:even").addClass("alt")},$.formatTable(),$("input:checkbox").live("change",function(){var n=$(this).parents("tr:eq(0)").find("span.move"),t=$(this).is(":checked"),i=$(this).attr("value");$.post("/SearchDivisions/AddRemoveDiv/",{id:$("#id").val(),divid:i,ischecked:t},function(){t?n.html("<a href='#' class='move' value='"+i+"'>move to top<\/a>"):n.empty()})}),$("a.move").live("click",function(n){var t,i;n.preventDefault(),t=$("#results").closest("form"),$("#topid").val($(this).attr("value")),i=t.serialize(),$.post("/SearchDivisions/MoveToTop",i,function(n){$("#results").replaceWith(n).ready($.formatTable)})}),$("form input").live("keypress",function(n){return n.which&&n.which==13||n.keyCode&&n.keyCode==13?($("#search").click(),!1):!0})})
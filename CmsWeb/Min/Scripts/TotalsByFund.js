$(function(){$(".datepicker").datepicker(),$("#run").click(function(n){n.preventDefault();var t=$(this).closest("form"),i=t.serialize();$.post("/FinanceReports/TotalsByFundResults",i,function(n){$("#results").html(n).ready(function(){$("table.grid tbody tr:even").addClass("alt")})})}),$("#export").click(function(n){n.preventDefault(),$.blockUI({theme:!0,title:"Producing Contributions Export",message:"<p>Click the page to continue after your download appears.<\/p>"});var t=$(this).closest("form"),i=t.serialize();window.location="/Export/Contributions?totals=false&"+i,$(".blockOverlay").attr("title","Click to unblock").click($.unblockUI)}),$("#exporttotals").click(function(n){n.preventDefault(),$.blockUI({theme:!0,title:"Producing Contribution Totals Export",message:"<p>Click the page to continue after your download appears.<\/p>"});var t=$(this).closest("form"),i=t.serialize();window.location="/Export/Contributions?totals=true&"+i,$(".blockOverlay").attr("title","Click to unblock").click($.unblockUI)}),$("#toquickbooks").click(function(n){n.preventDefault(),$.blockUI({theme:!0,title:"QuickBooks Export",message:"<p>Pushing data to QuickBooks, please wait...<\/p>"});var t=$(this).closest("form"),i=t.serialize();$.post("/FinanceReports/ToQuickBooks",i,function(){$.unblockUI()})}),$(".bt").button()})
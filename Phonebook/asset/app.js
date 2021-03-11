var login= $('#login');
var introDiv=$('.welcome');
var tbody=document.querySelector('tbody');

function updateTable(){
       var getxhttp=new XMLHttpRequest();
   getxhttp.onreadystatechange =function() { 
    if(this.readyState==4 && this.status==200){
        var rows=JSON.parse(this.responseText);
        for(var i=0;i<rows.length;i++){
            var id=rows[i].id;
            var name=rows[i].name;
            var number=rows[i].number;

            var tr=document.createElement('tr');
            tr.innerHTML=`<td>${id}</td>
                        <td>${name}</td>
                        <td>${number}</td>
                        <td><i class="fa fa-cog"></i></td>`;

            tbody.appendChild(tr);
        }

        addlistener();
        deleteListener();
   
    }
};

    getxhttp.open("GET","./ws.php",true);
    getxhttp.send();

}


login.on("click",function(e){
    updateTable();
    e.preventDefault();
    $('.welcome').fadeOut();
    $('.ui').fadeIn(2000);


}
)

$('#close-modal').on("click" , ()=> {
    $('.edit-parent').fadeOut(500);
    $('.show').fadeIn(1000);
});


$('#show-contacts').on("click" , ()=>{
    tbody.innerHTML='';
    updateTable();
    $('.create').fadeOut();
    $('.edit-parent').fadeOut();
    $('.show').fadeIn(1000);
    $('#create-contact').css('backgroundColor','transparent');
    $('#show-contacts').css('backgroundColor','#383d41ad');
});


$('#create-contact').on("click" , ()=> {
    $('.show').fadeOut();
    $('.edit-parent').fadeOut();
    $('.create').fadeIn(1500);
    $('#create-contact').css('backgroundColor','#383d41ad');
    $('#show-contacts').css('backgroundColor','transparent');

});

function addlistener(){
    $(".fa-cog").on("click" , (e)=>{
var number=(e.target.parentElement.previousElementSibling.innerHTML);
var name=(e.target.parentElement.previousElementSibling.previousElementSibling.innerHTML);
var id=(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML);
$('#edit-name').attr("value",name);
$('#edit-number').attr("value",number);
$('#edit-id').attr("value",id);
$('.show').fadeOut(500);
$(".edit-parent").fadeIn(1000);


console.log(id);


})
}


$('#create-contactbtn').on("click", function(e){
   var name= document.querySelector('#name').value;
   var number= document.querySelector('#number').value;
    var contact_obj={
        'name':name,
        'number':number
    }
   if(name== "" || number== ""){
       alert('همه فیلد هارا پر کنید');
   }else{

    var xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange=()=>{
        if(this.readyState==4 && this.status==200){
            console.log(this.responseText);
            location.reload();
        }
    };

    xhttp.open("POST","./ws.php",true);
    xhttp.send(JSON.stringify(contact_obj));

    alert("مخاطب با موفقیت اضافه شد!")
    
   }

})

$('#editbtn').on("click" , ()=> {
    var id= document.querySelector('#edit-id').value;
    var name= document.querySelector('#edit-name').value;
   var number= document.querySelector('#edit-number').value;

   var contact_obj={
    'id' : id,
    'name':name,
    'number':number
}

   var xhttp= new XMLHttpRequest();
   xhttp.onreadystatechange=()=>{
       if(this.readyState==4 && this.status==200){
           
           location.reload();
       }
   };

   xhttp.open("PUT","./ws.php",true);
   xhttp.send(JSON.stringify(contact_obj));
   console.log("Done");
   location.reload();
})

function deleteListener(){
    $('#deletebtn').on("click" , ()=> {
        var id= document.querySelector('#edit-id').value;
        var contact_obj={
            'id' : id
        }
    
        var xhttp= new XMLHttpRequest();
        xhttp.onreadystatechange=()=>{
            if(this.readyState==4 && this.status==200){
                
                
            }
        };
    
        xhttp.open("DELETE","./ws.php",true);
        xhttp.send(JSON.stringify(contact_obj));
        console.log("done");
        location.reload();
    
    
    })
}

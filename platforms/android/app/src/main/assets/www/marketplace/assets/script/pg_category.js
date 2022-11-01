function go_to_subcategory(id, title=''){
    
    var data = JSON.parse(localStorage.marketplacedata);
    var loop = 1;
    for(var i in data.categories){
        for (var j in data.categories[i].sub_category){
            if(data.categories[i].sub_category[j].category_id == id){
                title = data.categories[i].sub_category[j].category_title;
                loop = 0;
                break;
            } 
        }
        if(loop == 0){
            break;   
        }
    }   

    browse('sub'+id, title);
}


function go_to_category_group(id, title=''){
    
    var data = JSON.parse(localStorage.marketplacedata);
    for(var i in data.categories){
        if(data.categories[i].category_group_id == id){
            title = data.categories[i].category_group_name;
            break;
        }
    }
    
    browse('cat'+id, title);
}


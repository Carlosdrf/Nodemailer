let blogpost = document.querySelectorAll('#root table table table table tbody tr')

blogpost.forEach((element, i) => {
    console.log(element)
    if(i !== 0 && i !== 1){
        element.remove()
    }
    i++
});



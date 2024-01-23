const btnAddProduct = document.querySelectorAll(".btnAddProduct");

btnAddProduct.forEach(btn => {
    btn.addEventListener("click", async (e) => {
        const pid = e.target.getAttribute("data-id");
        const access_token = localStorage.getItem("access_token");
        let cid = localStorage.getItem("cid");
        
        let response = null;
        let resultJson = null;
        
        if(!cid){
            response = await fetch(`/api/cart`, {method: 'POST'});    
            resultJson = await response.json();
            cid = resultJson.cart._id;
            localStorage.setItem("cid", cid);
        }

        response = await fetch(`/api/cart/${cid}/${pid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        });
        
        resultJson = await response.json();
        if(response.status === 200){
            Swal.fire({
                icon: 'success',
                title: 'Agregado',
                text: 'El producto fue agregado al carrito exitosamente!'
            }).then(() => {
                location.href = `cart/${cid}`;
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: resultJson.error
            });
        }

    });
});
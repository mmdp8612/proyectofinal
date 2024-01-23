const deleteUser = (uid) => {

    const uid_session = localStorage.getItem("uid");
    if(uid === uid_session){
        Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'No puede eliminar su cuenta.'
        });
        return;
    }

    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Seguro que quiere eliminar este usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const response = await fetch(`/admin/users/${uid}`, {
                method: 'DELETE'
            });
            
            const result = await response.json();
            if(result.success){
                Swal.fire({
                    icon: 'success',
                    title: 'OK',
                    text: 'Usuario eliminado exitosamente!'
                }).then(() => {
                    location.reload();
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: result.message,
                    text: result.error
                });
            }
        }
    });
}

const changeRole = (uid) => {
    
    const opcionesHTML = `
        <option value="">Seleccione</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="premium">Premium</option>
    `;

    Swal.fire({
        title: 'Selecciona nuevo rol',
        html: `<select id="cboListRoles" class="swal2-input">${opcionesHTML}</select>`,
        confirmButtonText: 'Aceptar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
    }).then(async (result) => {
        if (result.isConfirmed) {
            const valorSeleccionado = document.getElementById('cboListRoles').value;
            const response = await fetch(`/admin/users/${uid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({newRole: valorSeleccionado})
            });
            
            const result = await response.json();
            if(result.success){
                Swal.fire({
                    icon: 'success',
                    title: 'OK',
                    text: 'Rol modificado con exito!'
                }).then(() => {
                    location.reload();
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: result.message,
                    text: result.error
                });
            }


        }
    });
}
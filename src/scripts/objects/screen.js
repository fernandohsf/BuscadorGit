const screen ={
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `
            <div class= "info">
                <img src = "${user.avatarUrl}" alt = "Foto de perfil do usuário" />
                <div class= "data">
                    <h1>${user.name ?? 'Não possui nome cadastrado.'}</h1>
                    <p class="followers" >Seguidores: ${user.followers} Seguindo: ${user.following}</p>
                    <p>${user.bio ?? 'Não possui bio cadastrada.'}</p>
                </div>
            </div>
            `
        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li>
                                                                    <a href="${repo.html_url}" target= "_blank">${repo.name} 
                                                                    <br><span>🍴${repo.forks_count}</span> <span>⭐${repo.stargazers_count}</span> <span>👀${repo.watchers_count}</span>
                                                                    <br> Linguagem: ${repo.language}</a>
                                                                </li>`)
        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `
                <div class="repositories section">    
                    <h2>Repositórios</h2>
                        <ul>${repositoriesItens}</ul>
                </div>
                `
        }
        let eventItens = ''
        user.events.forEach(function (event) {
            if(event.type === 'PushEvent' || event.type === 'CreateEvent'){
                eventItens += `<li><strong>${event.repo.name}</strong> - ${event.payload.commits[0].message}</li>`
            }
        })
        if(user.events.length > 0){
            this.userProfile.innerHTML += `
                <div class="events section">    
                    <h2>Eventos</h2>
                        <ul>${eventItens}</ul>
                </div>
                `
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = `<h3>Usuário não encontrado.</h3>`
    }
}
export {screen}
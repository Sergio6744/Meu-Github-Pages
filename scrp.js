class Botao {
   moon = document.querySelector("#moon")
   sun = document.querySelector("#sun")
   minha_ft = document.querySelector("#eu")
   p = document.querySelector("p")
   h2 = document.querySelector("h2")
   h1 = document.querySelector("h1")
   fundo = document.body
   
   modo_noite = function() {
      this.fundo.style.background = "#272727"
      this.minha_ft.style.borderColor = "#272727"
      this.moon.style.display = "none"
      this.sun.style.display = "inline"
      this.p.style.color = "white"
      this.h2.style.color = "white"
      this.h1.style.color = "white"
      localStorage.setItem("modo_dark", "false")
   }
   modo_dia = function() {
      this.fundo.style.background = "white"
      this.minha_ft.style.borderColor = "white"
      this.sun.style.display = "none"
      this.moon.style.display = "inline"
      this.p.style.color = "black"
      this.h2.style.color = "black"
      this.h1.style.color = "black"
      localStorage.setItem("modo_dark", "true")
   }
   pegar_bt_lua = function() {
      moon.addEventListener("click", ()=>{
         this.modo_noite()
      })
   }
   pegar_bt_sol = function() {
      sun.addEventListener("click", ()=>{
         this.modo_dia()
      })
   }
   preferencia = function() {
      if(localStorage.length > 0) {
         if(localStorage.getItem("modo_dark") == "false") {
            this.modo_noite()
         } else {
            this.modo_dia()
         }
      }
   }
}

let bt = new Botao()
bt.pegar_bt_lua()
bt.pegar_bt_sol()
bt.preferencia()



class Funcoes {
   rel = document.querySelector("#reload")
   bt_comp = document.querySelector("#share")
   url = window.location.href
   nav = document.querySelector("nav")
   
   checar = function() {
      if(!navigator.share) {
         this.bt_comp.style.display = "none"
         this.nav.style.marginLeft = "calc(100% - 210px)"
      }
   }
   update = function() {         
      this.rel.addEventListener("click", ()=>{
         document.location.reload(true)
      })
   }
   compartilhar = function() {
      this.bt_comp.addEventListener("click", ()=>{
         if(navigator.share) {
            navigator.share({
               title: "Minha Pagina",
               url: this.url
            })
         }
      })
   }
}

let nav = new Funcoes()
nav.update()
nav.compartilhar()
nav.checar()



class API {
   reposi = document.querySelector("#repos")
   
   escrever = function(dd) {
      for(let i of dd) {
         if("Meu-github-pages" == i['name']) {
            continue
         }
         
         let r = document.createElement("div")
         let n = document.createElement("p")
         let criado = document.createElement("p")
         let desc = document.createElement("p")
         let upd = document.createElement("p")
         let fr = document.createElement("iframe")
         let a = document.createElement("a")
         let lin = document.createElement("p")
         let cont = document.createElement("div")
         
         this.reposi.appendChild(r)
         r.appendChild(n)
         r.appendChild(desc)
         r.appendChild(cont)
         cont.appendChild(criado)
         cont.appendChild(upd)
         cont.appendChild(lin)
         r.appendChild(fr)
         r.appendChild(a)
         
         r.classList.add("repos")
         n.classList.add("nome")
         a.classList.add("link")
         lin.classList.add("info")
         criado.classList.add("info")
         desc.classList.add("info")
         upd.classList.add("info")
         cont.classList.add("conteiner_flex")
         
         n.innerHTML = i['name']
         fr.src = `https://sergio6744.github.io/${i['name']}/`
         a.innerHTML = "visitar"
         a.href = i['html_url']
         lin.innerHTML = i['language']
         criado.innerHTML = "Criado :   " + i['created_at'].substr(0,10)
         upd.innerHTML = "Atualz/: " + i['updated_at'].substr(0,10)
         desc.innerHTML = i['description']
         
         if(desc.innerHTML == "") {
            desc.innerHTML = "meu primeiro repositorio."
         }
      }
   }
   constructor() {
      fetch(`https://api.github.com/users/Sergio6744/repos`)
      .then(async resp => {
         if(!resp.ok) {
            throw new Error(resp.status)
         }
         let dados = await resp.json()
         this.escrever(dados)
      })
      .catch(() => {
         console.log("Erro na api!")
      })
   }
}

let api = new API()

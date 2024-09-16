const form = document.querySelector('#search-form > form')
const input: HTMLInputElement | null = document.querySelector('#input-localizacao')
const sectionInfos = document.querySelector('#time-info')

form?.addEventListener('submit', async (event) => {
    event.preventDefault()

    if(!input || !sectionInfos) return

    const localizacao = input.value 

    if(localizacao.length < 3){
        alert('O local precisa ter pelo menos 3 letras.')
        return
    }

    try{
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=49d0977716b0d19ff8ccfbd5c6c15850&lang=pt_br&units=metric`)
    
        const dados = await resposta.json()
    
        console.log(dados)
    
        const infos = {
            temperatura: Math.round(dados.main.temp),
            local: dados.name,
            icone: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
        }
    
        sectionInfos.innerHTML = `
        <div id="time-data">
            <h2>${infos.local}</h2>
            <span>${infos.temperatura}°C</span>
        </div>    
            <img src=${infos.icone}>
        `
    } catch(err){
        alert('Por favor, digite novamente.')
        console.log('Erro na obtenção dos dados: ', err)
    }
})


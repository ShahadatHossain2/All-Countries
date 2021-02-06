async function loadData() {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await response.json();
    countries(data);
    //console.log(data);
}

function countries(data) {
    const mainParent = document.getElementById('mainSection');
    const parent = document.getElementById('country-container');
    parent.style.display = "grid";
    parent.style.gridTemplateColumns = "repeat(4,1fr)";
    parent.style.gridGap = "1em";

    for (let i = 0; i < data.length; i++) {
        const countryName  = data[i].name;
        const countryCapital = data[i].capital;
        const countryFlag = data[i].flag;

        const div = document.createElement("div");
        div.style.border = "1px solid cyan";
        div.style.borderRadius = "10px";
        div.style.width = "300px";
        div.style.height = "200px";
        div.style.padding = "10px"
        parent.appendChild(div);

        const h2 = document.createElement("h2");
        h2.innerText = countryName;
        div.appendChild(h2);
        
        const h4 = document.createElement("h4");
        h4.innerText = `Capital : ${countryCapital}`;
        div.appendChild(h4);

        const img = document.createElement("img");
        img.setAttribute("src",countryFlag);
        img.style.width = "100px"
        div.appendChild(img);

        div.addEventListener('click', function(){
            document.getElementById('container').style.display = "none";
            fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
            .then(response => response.json())
            .then(data => {
                const newDiv = document.createElement("div");
                newDiv.style.color = "tomato";
                mainParent.appendChild(newDiv);

                const h2 = document.createElement("h2");
                h2.innerText = countryName;
                newDiv.appendChild(h2);

                const h4 = document.createElement("h4");
                h4.innerText = `Region : ${data[0].region}
                Population : ${data[0].population}`;
                newDiv.appendChild(h4);
            })
        })
    }
    // const countryName = data.map(country => country.name);
    // const countryCapital = data.map(country => country.capital);
    // const countryFlag = data.map(country => country.flag);

    // for (let i = 0; i < countryName.length; i++) {

    //     const div = document.createElement("div");
    //     div.style.border = "1px solid cyan";
    //     div.style.borderRadius = "10px";
    //     div.style.width = "200px";
    //     parent.appendChild(div);
    //     const name = countryName[i];
    //     const h2 = document.createElement("h2");
    //     h2.innerText = name;
    //     div.appendChild(h2);
    // }
    

    // console.log(countryName);
    // console.log(countryFlag);
    // console.log(countryCapital);
}

loadData();
document.getElementById('cepForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cep = document.getElementById('cep').value.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert('O CEP deve ter 8 dígitos.');
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            if (data.erro) {
                resultDiv.innerHTML = `<p>CEP não encontrado.</p>`;
            } else {
                resultDiv.innerHTML = `
                    <p><strong>CEP:</strong> ${data.cep}</p>
                    <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade:</strong> ${data.localidade}</p>
                    <p><strong>UF:</strong> ${data.uf}</p>
                `;
            }
        })
        .catch(error => {
            document.getElementById('result').innerHTML = `<p>Erro ao buscar CEP. Tente novamente.</p>`;
            console.error('Erro:', error);
        });
});
<h1 align="center">🙋‍♀️ Loritta Helper 🙋‍♀️</h1>
<img height="250" src="https://media.discordapp.net/attachments/702463514467368980/822457695529467935/kurama_lurk_compled.png" align="left">

O bot que responde automaticamente **QUASE** todas as perguntas sobre o Kuraminha em seu servidor de suporte.

Ele também responde questões relacionadas aos servidores da Rede Dark no servidor comunidade.

## 📅 Informação

* Esses bot é privado, mas você pode [self-hostear](https://en.wikipedia.org/wiki/Self-hosting_(web_services)) ele no seu servidor.
* Não consideraremos pull requests que não sejam úteis.
* Se você quiser ajuda com a contribuição, pode perguntar para alguém com o cargo de "✔ » Anbus do Kurama" no servidor da [comunidade](https://discord.gg/rededark) ou [suporte](), eles sabem muito bem como ajudá-lo.

# 🌎 Contribuindo

Você pode adicionar novas respostas ao Kurama Helper seguindo estas etapas:

* Em primeiro lugar, você precisa criar um arquivo com uma nova classe, extendendo a classe `ServerResponse`, com um nome que possa descrever qual é a sua resposta, algo como `ProfileBackgroundResponse.js`, na pasta `KuramaHelper/responses/{guild}/Name.js`.

* Vamos supor que você crie uma resposta que irá responder às pessoas sobre como ganhar Kurama Coins. O nome deve ser algo parecido `HowToGetCoinsResponse` ou relacionado, e você deve criar o arquivo na pasta `KuramaHelper/responses/support`.

* O Kurama detecta as perguntas usando [RegEx](https://en.wikipedia.org/wiki/Regular_expression), e isso exige alguns materiais que recomendamos:

    * [Para testar expressões](https://regex101.com/)
    * [Guia para aprender](https://medium.com/@alexandreservian/regex-um-guia-pratico-para-express%C3%B5es-regulares-1ac5fa4dd39f)

* Agora, você precisa definir as patterns para a classe, para que ela possa ser considerada pelo Kurama.

* Você deve adicionar os RegEx patterns, em uma lista array, mais ou menos assim:

```js
var patterns = [
    "como",
    "ganha|obtem|receber",
    "kurama(-| )coins|moedas|dinheiro"
]
```

* Depois disso, você deseja especificar a resposta, então precisa adicionar um método chamado run(args), que deve ser parecido com este:

```js
async run(client, message) {
    message.build(
        message.kuramaReply("você pode ganhar **__Kurama Coins__**.... Dormindo! Ksksks brincadeirinha! Existe uma maneira muito simples de ganhar **__Kurama Coins__**, apenas coletando daily! E você pode gastar por exemplo, apostando `^-^`!", "737016551433043998"),
    )
}
```

E então ao terminar esses processo, a sua resposta será adicionada automáticamente. Se ainda não entendeu, tente estudar as respostas que já foram adicionadas.

## 📊 License

This repository is under the [AGPL-3.0](https://github.com/LorittaBot/LorittaHelper/blob/main/LICENSE) license.
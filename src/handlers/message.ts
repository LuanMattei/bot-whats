import { WASocket } from "baileys";
import { FormattedMessage } from "../utils/message";

// Lista de saudações reconhecidas
const saudacoes = [
    'oi', 'oii', 'oiii', 'oie', 'ola', 'olá',
    'bom dia', 'boa tarde', 'boa noite',
    'e aí', 'eaí', 'fala', 'salve'
];

// Função para normalizar texto (minúsculas, sem acento)
const normalizarTexto = (texto: any) => {
    if (typeof texto !== 'string') return '';
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
};

// Menu principal
const enviarMenu = async (bot: WASocket, jid: string) => {
    await bot.sendMessage(jid, {
        text: `🌿 Olá! Seja muito bem-vindo(a) ao nosso Home Spa. 😌✨

Estamos aqui para cuidar de você com carinho e bem-estar! 💆‍♀️💖

Digite o número de uma das opções para continuar:

1️⃣ Ver todos os serviços  
2️⃣ Ver valores e promoções  
3️⃣ Agendar um horário  
4️⃣ Falar com um atendente  
5️⃣ Saber onde atendemos  
6️⃣ Encerrar atendimento

🔁 Digite "menu" ou "voltar" a qualquer momento para retornar ao menu.`
    });
};

const MessageHandler = async (bot: WASocket, message: FormattedMessage) => {
    const jid = message.key.remoteJid!;
    const texto = normalizarTexto(message.content);

    // 👉 Verifica se é uma saudação
    if (saudacoes.includes(texto)) {
        await enviarMenu(bot, jid);
        return;
    }

    // 👉 Comando para voltar ao menu
    if (texto === 'menu' || texto === 'voltar') {
        await enviarMenu(bot, jid);
        return;
    }

    // 👉 Opção 1 – Ver serviços
    if (texto === '1') {
        await bot.sendMessage(jid, {
            text: `🧖‍♀️ *Nossos serviços incluem*:

- Massagem Relaxante  
- Massagem Terapêutica  
- Drenagem Linfática  
- Massagem Modeladora  
- Reflexologia  
- Ventosaterapia  
- Spa dos Pés  
- Pacotes mensais e especiais ✨

💬 Digite "menu" para voltar.`
        });
        return;
    }

    // 👉 Opção 2 – Ver valores
    if (texto === '2') {
        await bot.sendMessage(jid, {
            text: `💸 *Tabela de Valores* (sessão individual):

- Massagem Relaxante – R$ 120  
- Drenagem Linfática – R$ 130  
- Terapêutica – R$ 140  
- Spa dos Pés – R$ 90  
- Pacote 4 sessões – a partir de R$ 400  
🎁 *Promoção da semana*: Massagem Relaxante por R$ 99!

💬 Digite "menu" para voltar.`
        });
        return;
    }

    // 👉 Opção 3 – Agendar horário
    if (texto === '3') {
        await bot.sendMessage(jid, {
            text: `📅 *Agendamento*

Informe, por favor:
1. O serviço desejado  
2. Data e horário preferido  
3. Bairro ou região  

Vamos verificar a disponibilidade para você 💖

💬 Digite "menu" para voltar.`
        });
        return;
    }

    // 👉 Opção 4 – Falar com atendente
    if (texto === '4') {
        await bot.sendMessage(jid, {
            text: `👩‍💻 Encaminhando você para um de nossos atendentes humanos...

Por favor, aguarde um instante. ⏳

💬 Digite "menu" para voltar.`
        });
        return;
    }

    // 👉 Opção 5 – Áreas atendidas
    if (texto === '5') {
        await bot.sendMessage(jid, {
            text: `📍 *Atendimento domiciliar em:*

- São Paulo - Capital  
- Zona Sul, Zona Oeste, Centro  
- Consultar outras regiões sob disponibilidade  

Informe seu bairro para confirmarmos!

💬 Digite "menu" para voltar.`
        });
        return;
    }

if (texto === '6' || texto === 'encerrar' || texto === 'sair') {
    await bot.sendMessage(jid, {
        text: `🙏 Agradecemos o seu contato com o Home Spa.  
Esperamos vê-lo(a) em breve para um momento de relaxamento! 🌸

Tenha um ótimo dia! 💖`
    });
    return;
}
};
export default MessageHandler;
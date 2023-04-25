const prompts = [
  "uma poltrona com a forma de um abacate",
  "uma pintura a óleo surrealista de Salvador Dalí, semelhante a um sonho de um gato jogando damas",
  "ursos de pelúcia em mercearia no Japão, ukiyo-e",
  "uma pintura a óleo de Matisse de um robô humanóide jogando xadrez",
  "panda cientista maluco misturando produtos químicos cintilantes, arte digital",
  "uma fotografia macro de 35mm de dois ratos no Havai, cada um deles vestindo minúsculos fatos de banho e transportando minúsculas pranchas de surf, arte digital",
  "renderização 3D de um belo peixe tropical num aquário sobre um fundo azul escuro, arte digital",
  "um astronauta descansando em um resort tropical no espaço, vaporwave",
  "um retrato a óleo de uma capivara com vestes reais medievais e uma coroa ornamentada sobre um fundo escuro",
  "um vitral representando um hambúrguer e batatas fritas",
  "um desenho a lápis e aquarela de uma cidade brilhante no futuro com carros voadores",
  "uma área coberta iluminada pelo sol com uma piscina com água clara e outra piscina com água rosa pastel translúcida, junto a uma grande janela, arte digital",
  "um shiba inu adivinho lendo o seu destino num hambúrguer gigante, arte digital",
  "uma lontra marinha com um brinco de pérola de Johannes Vermeer",
  "um desenho em pastel de óleo de um gato irritado numa nave espacial",
  "uma pintura de uma raposa ao estilo da Noite Estrelada",
  "uma tigela de sopa que parece um monstro, tricotada de lã",
  "Um robô de peluche sentado contra uma parede amarela",
  "Um pôr-do-sol ao estilo synthwave sobre a água reflectora do mar, arte digital",
  "Duas torres futuristas com uma ponte aérea coberta de exuberante folhagem, arte digital",
  "Um renderização em 3D de um balão de ar quente colorido arco-íris voando sobre um lago reflector",
  "Uma capa de banda desenhada de um super-herói a usar auscultadores",
  "Uma explosão centrada de pó colorido sobre fundo preto",
  "Uma fotografia de um cão Samoyed com a língua para fora abraçando um gato siameses branco",
  "Uma fotografia de um monstro de peles brancas em pé numa sala púrpura",
  "Uma fotografia da escultura de Miguel Ângelo de David com auscultadores djing",
  "Um Samurai montado a cavalo em Marte, lomografia",
  "Um moderno e elegante Cadillac conduz ao longo da via rápida Gardiner, com o centro de Toronto ao fundo, com um foguete de lentes, fotografia de 50mm",
  "Uma fotografia realista de uma jovem mulher com olhos azuis e cabelo loiro",
  "Um homem em frente de um Stargate para outra dimensão",
  "Spongebob Squarepants in the Blair Witch Project",
  "Um velociraptor a trabalhar numa banca de cachorros quentes, lomografia",
  "Um homem a caminhar pelas ruas movimentadas de Kowloon à noite, iluminado por muitas placas brilhantes de néon, lentes de 50mm",
  "Um churrasco vivo, ao estilo de um filme de animação da Pixar",
  "Um clube de dança ciborgue futurista, luzes de néon",
  "O Anime Japonês da Guerra das Estrelas há muito perdida de 1990",
  "Um hambúrguer em forma de cubo de Rubik, fotografia profissional de alimentos",
  "A Synthwave Hedgehog, Blade Runner Cyberpunk",
  "Um astronauta que encontra uma forma de vida alienígena num planeta distante, a fotografia",
  "Um Dinossauro a explorar a Cidade do Cabo, fotografia",
  "Um homem apaixonado pelo seu computador, arte digital",
  "Uma fotografia de um ciborgue a explorar Tóquio à noite, lomografia",
  "Drácula andando pela rua de Nova Iorque nos anos 20, fotografia a preto e branco",
  "Avião Synthwave",
  "Um homem vagueia pelas ruas chuvosas de Tóquio, com sinais brilhantes de néon, 50mm",
  "Um vaivém espacial voando sobre a Cidade do Cabo, arte digital",
];

export function getRandomPrompt(prompt: string): string {
  const index = Math.floor(Math.random() * prompts.length);
  const randomPrompt = prompts[index];

  if (randomPrompt === prompt) {
    return getRandomPrompt(prompt);
  }

  return randomPrompt;
}

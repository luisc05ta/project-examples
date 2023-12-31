// api de teste: https://rapidapi.com/dickyagustin/api/text-translator2

const apiKey = import.meta.env.VITE_API_KEY_TRANSLATE;

export async function traduzirCitacao (
    texto: string,
    idioma: string
): Promise<string> {
    let traducao = "";

    try {
        const resposta = await fetch(
            "https://text-translator2.p.rapidapi.com/translate",
            {
                method: "POST",
                body: new URLSearchParams({
                    text: texto,
                    target_language: idioma,
                    source_language: "pt",
                }),
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "Accept-Encoding": "application/gzip",
                    "X-RapidAPI-Key": apiKey,
                    "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
                },
            }
        );

        const data = await resposta.json();
        traducao = data.data.translatedText;
    } catch (erro) {
        console.error("Erro ao traduzir citação:", erro);
    }

    return traducao;
}

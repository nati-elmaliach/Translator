import { LangType } from "../utils/constants";

const queryCache: { [key: string]: string } = {}


async function translate(q: string, source: LangType, target: LangType) {
    const key = `${q}-${source}-${target}`;
    const cachedValue = queryCache[key];
    // TODO: better caching
    if (cachedValue) {
        return cachedValue
    }

    const result = await fetch("http://localhost:5000/translate", {
        method: "POST",
        body: JSON.stringify({
            q,
            source,
            target,
        }),
        headers: { "Content-Type": "application/json" },
        });
    const translation = await result.json();
    queryCache[key] = translation
    return translation;
}

const CONCURRENCY = 10;
export async function changeLang(source: LangType, target: LangType) {
    const translateElement = async (element: HTMLElement) => {
        const textContent = element.textContent;
        if (textContent) {
            try {
                const { translatedText } = await translate(textContent, source, target);
                if (translatedText) {
                    element.textContent = translatedText;
                }
            } catch (error) {
                element.textContent += ' *'
            }
        }
    }

    async function runTask(task: any) { 
        running.add(task);
        try {
            await task;
        } catch (error) {
            // TODO: count number of errors
            console.log(error)            
        } finally {
            running.delete(task)
        }
    }

    const elementsToTranslate = Array.from(document.querySelectorAll("[translate='yes']"));
    let running = new Set<Promise<any>>();

    // TODO: Replace with while loop
    for (const element of elementsToTranslate) {
        if (running.size < CONCURRENCY) {
            runTask(translateElement(element as HTMLElement))
        } else {
            // Wait for at least 1 to complete
            await Promise.race(running);
            // Enqeue a new task
            runTask(translateElement(element as HTMLElement))
        }
    }
}
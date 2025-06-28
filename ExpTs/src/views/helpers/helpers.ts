import { Prof, Technology } from "./helpersTypes";

export function listProfs(profs: Prof[]) {
    return `<ul>${profs.map((prof) => `<li>${prof.name}</li>`).join(",")}<ul>`
}

export function listTechnologies(techs: Technology[]) {
    const filteredTechs = techs.filter((t) => t.poweredByNodejs);
    const lista = filteredTechs.map((t) => `<li>${t.name} - ${t.type}</li>`);
    return `<ul>${lista.join("")}</ul>`;
}

// Adicione o helper eq
export function eq(a: any, b: any) {
    return a === b;
}

// Exporte tudo junto para o handlebars
export default {
    listProfs,
    listTechnologies,
    eq
};

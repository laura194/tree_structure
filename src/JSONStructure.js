const fs = require('fs');

class Filesystem {
    constructor(structure = []) {
        this.structure = structure;
    }

    saveToFile(filename) {
        /** Speichert die Struktur in eine JSON-Datei. */
        fs.writeFileSync(filename, JSON.stringify(this.structure, null, 4), 'utf-8');
    }

    loadFromFile(filename) {
        /** Lädt die Struktur aus einer JSON-Datei. */
        const data = fs.readFileSync(filename, 'utf-8');
        this.structure = JSON.parse(data);
    }

    getStructure() {
        /** Gibt die aktuelle Struktur zurück. */
        return this.structure;
    }
}

// Beispielverwendung
const data = [
    {
        name: "Home",
        nodes: [
            {
                name: "Movies",
                nodes: [
                    {
                        name: "Action",
                        nodes: [
                            {
                                name: "2000s",
                                nodes: [
                                    { name: "Lego-Movie.mp4" },
                                    { name: "Lego-Movie2.mp4" }
                                ]
                            },
                            { name: "2010s", nodes: [] }
                        ]
                    },
                    { name: "Comedy", nodes: [{ name: "2000s", nodes: [] }] },
                    {
                        name: "Music",
                        nodes: [
                            { name: "Rock", nodes: [] },
                            { name: "Metal", nodes: [] }
                        ]
                    },
                    { name: "Pictures", nodes: [] },
                    { name: "Documents", nodes: [] },
                    { name: "password.txt" }
                ]
            }
        ]
    }
];

const fsInstance = new Filesystem(data);
fsInstance.saveToFile("filesystem.json");

// Laden der Datei und Ausgabe der Struktur
fsInstance.loadFromFile("filesystem.json");
console.log(fsInstance.getStructure());
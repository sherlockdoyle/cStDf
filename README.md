# cStDf

Capture the Flag, or CTF, is a term you might have haerd. Wikipedia describes it as an activity where participants try to locate hidden text strings, known as "flags". These flags are concealed within programs or websites that are intentionally made vulnerable.

`cStDf` is a set of challenges that fall under this category of CTF. It is created using Vue and Vuetify. However, it's important to note that these challenges might not fit the traditional definition of CTF.

In fact, it might be more accurate to describe them as a series of puzzles or riddles. The objective of these challenges is to find a hidden string, also referred to as a flag, within various files. Alternatively, you might be tasked with decoding something.

In essence, `cStDf` is more akin to a game. It is a collection of various unique ideas that have crossed my mind about hiding things. It's possible that you might need to refer to some of my other projects to solve these challenges. But then again, you might not need to.

You're also free to use other tools at your disposal. The only rule is to play fair and avoid cheating. After all, the real fun lies in solving the puzzles on your own. Enjoy the game! :)

## Puzzles

The puzzles are all located in the [`src/ctfs`](src/ctfs) directory. Each puzzle has its own folder, and inside each folder, you'll find several files:

- `name`: Contains the name of the puzzle in a single line.
- `description.md`: Provides the description or setup for the puzzle.
- `CTF.*`: The actual puzzle file.
- `details.json`: Contains the MD5 hash of the flag in JSON format.
- `Sol.md`: Write the solution for the puzzle.

You can easily create these files by running `npm run create-ctf <folder-name>`.

### `CTF.vue`, `CTF.png`, `CTF.svg`, `CTF.html`, `CTF.pdf`, `CTF.wav`

You can create one of the above files for the puzzle. It could be a *Vue component*, an *image*, a *HTML file*, a *PDF file*, or a *WAV file*. If there are multiple files present, the puzzles follow the order specified — meaning the first file gets rendered.

### `details.json`

The `details.json` file includes the MD5 hash of the flag, path to any dependencies, and the summary of the puzzle. Dependencies are puzzles that need to be solved to make sense of the current puzzle. It looks something like this:

```json
{
  "flagMD5": "...",
  "dependencies": ["path/to/another/puzzle"],
  "summary": "...",
}
```

You can either create the summary from the `description.md` file by running `npm run create-summary`, or add it manually.

### `Sol.md`

The `Sol.md` file contains several paragraphs. Each paragraph provides a hint for the puzzle. The last line of the file can be the flag itself, formatted like this:

```md
The flag is: ...
```

When you run the `npm run sol-rewrite` command, it encodes the `Sol.md` file into a `solution.md` file. This encoding is done to make the solution a bit harder to read. The `Sol.md` file is not committed to the repository. Instead, the `solution.md` file is committed. This way, the solution is kept hidden, adding to the challenge of the puzzle.

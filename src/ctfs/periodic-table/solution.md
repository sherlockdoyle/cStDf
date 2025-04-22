# Solution: Periodic Table

This CTF requires combining clues from the description with interaction in the Vue component.

## Step 1: Finding the Keyword

The description (`description.md`) contains several hints pointing towards the Vigenère cipher keyword:

1.  **Direct Mention:** The text mentions "Dr. **Valen**tina **Ce**rmet" and the property "**valence**".
2.  **Acrostic Hint:** The quote "'**V**arious **a**toms **l**ink **e**nergetically; **n**oble **c**onfigurations **e**merge.'" uses the first letter of each word to spell **VALENCE**.
3.  **Thematic Hint:** The description discusses electron shells, bonding, and reactivity, all related to the concept of valence electrons.

From these clues, the keyword is **VALENCE**.

## Step 2: Decrypting the Puzzle

1.  Go to the interactive component below the description.
2.  Enter the keyword `VALENCE` into the input field and submit.
3.  This decrypts the element symbols displayed in the component. The encrypted symbols `["GI", "MI", "O", "G", "N", "S", "H", "AI", "YA", "ZP", "EX", "SW", "T", "U", "EL", "MR"]` decrypt to `["Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar"]`.

## Step 3: Solving the Periodic Table Puzzle

The puzzle requires arranging the decrypted elements into their correct positions for Period 2 and Period 3 of the periodic table.

*   **Period 2 Elements:** Li, Be, B, C, N, O, F, Ne
*   **Period 3 Elements:** Na, Mg, Al, Si, P, S, Cl, Ar

Enter these into the respective input fields in the component, separated by commas (or arrange them if it's a drag-and-drop interface).

## Step 4: The Flag

Once the elements are arranged correctly, the component will display the flag:

`cStDf{P3r1od1c_L0g1c}`

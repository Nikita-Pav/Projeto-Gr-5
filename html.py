import random 

nums = [1,2,3,4,5,6,7,8,9,10]
row = random.sample(nums, 5)
grid = []
for i in row:
    for j in row:
        grid.append(i*j)

random.shuffle(grid)
row.sort()

#print(grid[0:5])
#print(row)

html = f"""<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jogo da Velha - 5x5</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body {{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: white;
        }}
        .grid-container {{
            display: grid;
            grid-template-columns: repeat(5, 50px);
            grid-template-rows: repeat(5, 50px);
            gap: 2px;
            margin-bottom: 20px;
        }}
        .grid-item, .row-item {{
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid black;
            font-size: 16px;
        }}
        .grid-item:active, .row-item:active {{
            background-color: lightgray;
        }}
        .row-container {{
            display: flex;
            gap: 2px;
        }}
    </style>
</head>
<body>
    <div class="grid-container">
        <div class="grid-item">{grid[0]}</div>
        <div class="grid-item">{grid[1]}</div>
        <div class="grid-item">{grid[2]}</div>
        <div class="grid-item">{grid[3]}</div>
        <div class="grid-item">{grid[4]}</div>
        <div class="grid-item">{grid[5]}</div>
        <div class="grid-item">{grid[6]}</div>
        <div class="grid-item">{grid[7]}</div>
        <div class="grid-item">{grid[8]}</div>
        <div class="grid-item">{grid[9]}</div>
        <div class="grid-item">{grid[10]}</div>
        <div class="grid-item">{grid[11]}</div>
        <div class="grid-item">{grid[12]}</div>
        <div class="grid-item">{grid[13]}</div>
        <div class="grid-item">{grid[14]}</div>
        <div class="grid-item">{grid[15]}</div>
        <div class="grid-item">{grid[16]}</div>
        <div class="grid-item">{grid[17]}</div>
        <div class="grid-item">{grid[18]}</div>
        <div class="grid-item">{grid[19]}</div>
        <div class="grid-item">{grid[20]}</div>
        <div class="grid-item">{grid[21]}</div>
        <div class="grid-item">{grid[22]}</div>
        <div class="grid-item">{grid[23]}</div>
        <div class="grid-item">{grid[24]}</div>
    </div>
    <div class="row-container">
        <div class="row-item">{row[0]}</div>
        <div class="row-item">{row[1]}</div>
        <div class="row-item">{row[2]}</div>
        <div class="row-item">{row[3]}</div>
        <div class="row-item">{row[4]}</div>
    </div>
</body>
</html>
"""

fic = open("jogoVelha.html", "w")
fic.write(html)
fic.close()

print("Stauts (Jogo): Pronto")
import sys
from PIL import Image

w = 93 * 2
h = 52 * 4

def main():
  grid = [[0 for x in range(w)] for y in range(h)]

  with open('./forma.ascii', 'r') as file:
    y = 0
    for line in file:
      x = 0
      line = line.strip()
      if not line:
        continue
      for char in line:
        b = bin(ord(char) - 0x2800)[2:].zfill(8)
        #print(b)
        grid[y][x] = int(b[7])
        grid[y+1][x] = int(b[6])
        grid[y+2][x] = int(b[5])
        grid[y+3][x] = int(b[1])
        grid[y][x+1] = int(b[4])
        grid[y+1][x+1] = int(b[3])
        grid[y+2][x+1] = int(b[2])
        grid[y+3][x+1] = int(b[0])
        x += 2
      y += 4

  img = Image.new('1', (w * 8, h * 8))
  pixels = img.load()

  for i in range(w):
    for j in range(h):
      for x in range(8):
        for y in range(8):
          pixels[(i * 8) + x, (j * 8) + y] = grid[j][i]

  img.save('./forma-genesis.png')
  img.show()


if __name__ == "__main__":
  main()

---
layout: ../../layouts/BaseLayout.astro
title: Initialize Window in pygame
---

<div class="article-container">

<header style="margin-bottom: 2.5rem;">
  <h1 style="font-size: 2.8rem; line-height: 1.25; margin-bottom: 0.5rem;">How to initialize a window<br>and game loop using pygame</h1>
  <p style="color: rgb(155, 155, 165); margin-top: 0.25rem; font-size: 1.15rem;">A step-by-step walkthrough to get your canvas running at 60 FPS.</p>
</header>

<code-card title="main.py">

```python
import pygame
import sys

pygame.init()

screen = pygame.display.set_mode((1920, 1080))
pygame.display.set_caption("Your Project")
clock = pygame.time.Clock()

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # your program logic

    screen.fill((0, 0, 0))
    pygame.display.flip()
    clock.tick(60)

pygame.quit()
sys.exit()
```

</code-card>

<hr style="border: none; border-top: 1.5px solid RGB(151, 151, 161); ">

The first step is to import and initialize `pygame`. If you haven't installed it yet, run `pip install pygame` in your terminal:

```python
import pygame
pygame.init()
```

Next, set the screen resolution and initialize a clock to cap and monitor the framerate:

```python
screen = pygame.display.set_mode((1920, 1080))
clock = pygame.time.Clock()
```

Optionally, you can also give the window a custom title:

```python
pygame.display.set_caption("My Project")
```

Next, create the core game loop using a `while` loop that runs continuously until the player exits:

```python
running = True
while running:
```

Inside the loop, listen for window events. When the close button or `QUIT` event is triggered, set `running` to `False` to break out:

```python
for event in pygame.event.get():
    if event.type == pygame.QUIT:
        running = False
```

Now comes your **program's logic** (updating positions, handling keypresses, collisions). At the end of every frame, clear/fill the background and **refresh** the display:

```python
screen.fill((40, 44, 52))
pygame.display.flip()
clock.tick(60)
```

`pygame.display.flip()` updates the entire display surface to show everything drawn during this tick. You can adjust the `60` in `clock.tick(60)` to match your desired target framerate.

Finally, clean up and close the window safely once `running` is `False` and the loop exits:

```python
pygame.quit()
sys.exit()
```

</div>

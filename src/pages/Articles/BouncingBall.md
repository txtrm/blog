---
layout: ../../layouts/BaseLayout.astro
title: Bouncing Ball Simulation
---
<div class="article-container">

# Bouncing Ball

This is the most basic ball simulation one can make, because you're not
yet using **true circle collisions.**
My library of choice for this and most of my coding projects in python is
`pygame`, which alows you to draw **basic shapes** in an updating window.

To start I [**initialized a window**](InitializeWindow) using `pygame`.

Then, I created variables for the ball's `velocity`,`Position`, `radius` and the `gravity`-strength and
drew the ball to the screen using those variables in the game loop:

```python
ballPos = pygame.Vector2(400, 300)
ballVel = pygame.Vector2(6, 0)
Gravity = 0.5
radius = 20
```
```python
pygame.draw.circle(screen, (255, 255, 255), (int(ballPos.x), int(ballPos.y)), radius)
```

I used pygame's **Vector2** type, but you could also use **integers** for the `x` and `y` components.

The `Gravity` is added to the `BallVelocity's` `y` component every frame, because coordinates in pygame
are indexed from the **top left** corner and therefore the y-coordinate increase downwards.
Then the `velocity` is added to the ball's `position`, so that the ball is constantly falling down 
faster, immitating gravity.

```python
ballVel.y += Gravity
ballPos += ballVel
```

Now comes the fun part, the **bounce**. To make the ball 'bounce on the floor we invert the `velocity's` `y`
Component once the ball touches the floor, which can be calculated, by the `position` + `radius`. Additionally 
we set the ball's `position` so that it's **directly** touching the floor to avoid cases where the check happened
while the circle was already in the floor, which causes the ball to get **stuck** in the floor.

```python
if ballPos.y + radius >= 600:
    ballPos.y = 600 - radius
    ballVel.y *= -1
```

But instead of multiplying `BallVel.y` by -1, we can multiply by a **value** like `-0.85` and multiply the Ball's 
`velocity.x` by something like `0.99` to simulate the loss of energy and ground friction.

```python
ballVel.y *= -0.85
ballVel.x *= 0.99
```

Finally I just applied the `velocity` inversion for every side *(top, right and left)*  

Optionally, you could **launch** the ball in a random **direction** with a random **strength** when the space bar is pressed:

```python
if event.type == pygame.KEYDOWN:
    if event.key == pygame.K_SPACE:
        ballVel.y = random.randint(-20, 20)
        ballVel.x = random.randint(-20, 20)
```  

Here's the **full code**:

<code-card title="BouncingBall.py">

```python
import sys
import pygame
import random

pygame.init()

screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("bouncing circles")
clock = pygame.time.Clock()

ballPos = pygame.Vector2(400, 300)
ballVel = pygame.Vector2(6, 0)
Gravity = 0.5
radius = 20

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                ballVel.y = random.randint(-20, 20)
                ballVel.x = random.randint(-20, 20)

    # Apply Gravity
    ballVel.y += Gravity
    ballPos += ballVel

    # Floor Collision
    if ballPos.y + radius >= 600:
        ballPos.y = 600 - radius
        ballVel.y *= -0.85  # Invert direction and reduce energy
        ballVel.x *= 0.99  # Apply ground friction

        # Stop micro-jittering when momentum is nearly gone
        if abs(ballVel.y) < 1:
            ballVel.y = 0

    # Ceiling Collision
    elif ballPos.y - radius <= 0:
        ballPos.y = radius
        ballVel.y *= -0.85

    # Wall Collisions
    if ballPos.x + radius >= 800:
        ballPos.x = 800 - radius
        ballVel.x *= -0.8
    elif ballPos.x - radius <= 0:
        ballPos.x = radius
        ballVel.x *= -0.8

    screen.fill((40, 44, 52))
    pygame.draw.circle(screen, (255, 255, 255), (int(ballPos.x), int(ballPos.y)), radius)
    pygame.display.flip()
    clock.tick(60)

pygame.quit()
sys.exit()

```

</code-card>

</div>
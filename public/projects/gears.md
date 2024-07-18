---
name: Gears
images: 
    - /assets/images/project/gears/gears.png
description: A game to help transition high school students with learning disabilities and ADHD to postsecondary.
links:
    website: https://sites.google.com/view/gears-game/
tags:
    - gamedev
    - react
---

Gears is a game that aims to help transition high school students with learning disabilities and ADHD to a postsecondary learning environment.

# The Gameplay
The game is a point and click adventure game with dialog trees for user interaction. There are additional minigames and activities as well, which serve as ways to test student's understanding of the concepts so far, as well as put the ideas they've learned to practice.

![dialog](/assets/images/project/gears/gears.png)
# The Technology
The game is built for the web using react and typescript on top of the [create-react-app](https://create-react-app.dev/) framework. 

## Data Driven Gameplay

As a goal for this project, I set out to make everything data driven. All game scenes, dialog, mini-games, activities, and documents are generated using JSON files. As an example, a scene may be defined by the following:

```json
{
    "name": "university_hallway",
    "backgroundImages": ["university_hallway.png"],
    "elements": [
        {
            "type": "clickable_region",
            "x": 0.8,
            "y": 0.2,
            "x2": 1,
            "y2": 1,
            "execute": {
                "type": "update_chapter",
                "new_chapter": 5
            }
        },
        {
            "type": "clickable_region",
            "x": 0,
            "y": 0.3,
            "x2": 0.2,
            "y2": 0.9,
            "execute": {
                "type": "change_scene",
                "scene": "another_scene_name"
            }
        }
    ]
}
```

>[!note] Note
> All code snippets have had names and schemas modified due to copyright concerns.

A scene is built of a set of possible background images, and elements that users can interact with; either baked into the background or rendered on top.

## Event System
All events that occur during gameplay are also data driven, being executed by a custom event handler system. It enqueues actions in a FIFO queue and handles actions on a "frame by frame" basis. Actions may in turn enqueue additional actions.

# My Role
I've been a developer for the project since the inception of the project in the spring of 2022. My role has mainly been with the development of the data-driven systems that are used to add content to the game, however, I have also played a key role in creating and implementing said content as well.


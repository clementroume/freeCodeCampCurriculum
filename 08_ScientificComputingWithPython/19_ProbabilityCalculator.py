import copy
import random


class Hat:

    def __init__(self, **kwargs):
        self.contents = []
        for color, count in kwargs.items():
            self.contents.extend([color] * count)

    def draw(self, to_draw):
        if to_draw >= len(self.contents):
            all_balls = self.contents.copy()
            self.contents.clear()
            return all_balls

        drawed_balls = []
        while len(drawed_balls) < to_draw:
            drawed_ball = random.choice(self.contents)
            self.contents.remove(drawed_ball)
            drawed_balls.append(drawed_ball)
        return drawed_balls


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    m = 0
    for _ in range(num_experiments):
        hat_copy = copy.deepcopy(hat)
        drawed_balls = hat_copy.draw(num_balls_drawn)

        drawed_dict = {}
        for ball in drawed_balls:
            drawed_dict[ball] = drawed_dict.get(ball, 0) + 1
        success = all(
            drawed_dict.get(color, 0) >= count
            for color, count in expected_balls.items()
            )
        if success:
            m += 1

    return m / num_experiments


hat = Hat(black=6, red=4, green=3)
probability = experiment(
    hat=hat,
    expected_balls={'red': 2, 'green': 1},
    num_balls_drawn=5,
    num_experiments=2000)

print(probability)

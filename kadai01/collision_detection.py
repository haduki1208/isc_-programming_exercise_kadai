class Object:
    def __init__(self, x=0, y=0, width=0, height=0):
        self.x = x
        self.y = y
        self.width = width
        self.height = height


def __checkCollision(myself: Object, yourself: Object):
    for p in (myself.x, myself.y, myself.x + myself.width, myself.y + myself.height):
        if yourself.x <= p <= yourself.x + yourself.width and yourself.y <= p <= yourself.y + yourself.height:
            return True
    return False


def __convertCoordinateStrToInt(coordinate: str):
    return (int(i) for i in coordinate.split(" "))


def isHit(input_line: str):
    myCoordinate, enemyCount, *enemyCoordinateList = input_line.split("\n")
    enemyCount = int(enemyCount)
    player = Object(*__convertCoordinateStrToInt(myCoordinate))

    for i in range(enemyCount):
        enemy = Object(*__convertCoordinateStrToInt(enemyCoordinateList[i]))
        if __checkCollision(player, enemy):
            print(f"敵機{i + 1} が当たり")

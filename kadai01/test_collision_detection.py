import unittest
import contextlib


class TestCollisionDetection(unittest.TestCase):
    def test_collision_detection(self):
        from collision_detection import isHit
        from io import StringIO
        buf = StringIO()
        value = "\n".join([
            "100 100 70 100",
            "3",
            "50 60 100 50",
            "10 120 100 50",
            "165 115 70 70"
        ])

        with contextlib.redirect_stdout(buf):
            isHit(value)

        # 末尾の改行は許容する
        actual = buf.getvalue().rstrip()
        expected = "\n".join([
            "敵機1 が当たり",
            "敵機3 が当たり",
        ])
        self.assertEqual(expected, actual)


if __name__ == "__main__":
    unittest.main()

from flask import Flask, render_template
import RPi.GPIO as GPIO

app = Flask(__name__)

pins = (11,12) #pins is a dict

GPIO.setmode(GPIO.BOARD)
GPIO.setup(pins, GPIO.OUT)
GPIO.output(pins, GPIO.LOW)

p_R = GPIO.PWM(pins[0], 2000)
p_G = GPIO.PWM(pins[1], 2000)


app@route('/on')
def on ():
    print("hello World!")




# gpiozero-toggle-led
Example using js-gpiozero library to toggle internal activity LED on the Raspberry Pi Zero W.

Note that the "zero" in gpiozero doesn't imply the Raspberry Pi **Zero** (although that's the platform I developed this on). It's related to the original gpiozero Python library which has now been ported in JavaScript as js-gpiozero.

## Installation
Here, I'm assuming that your Raspberry Pi Zero W is named `pizero` but that might not be the case. Make sure to update for your Pi's hostname below.

First make sure that your Raspberry Pi Zero is up-to-date.

```
$ ssh pi@pizero.local
$ sudo apt-get update
```

Next, make sure that you have the latest version of Node for the Raspbian distribution.  Note that this will be different for a Raspberry Pi 3 and you shouldn't run this.

```
$ cd ~
$ wget https://nodejs.org/dist/v6.10.3/node-v6.10.3-linux-armv6l.tar.xz
$ tar -xJf node-v6.10.3-linux-armv6l.tar.xz
$ cd node-v6.10.3-linux-armv6l
$ ./bin/node -v
v6.10.3
$ sudo cp -R * /usr/local
$ node -v
v6.10.3
$ npm -v
3.10.10
```
Now you're ready to pull the code and run it, noting that it takes root privileges to talk to the GPIO pins so `npm start` has to run via `sudo`.

```
# This command will temporarily turn off the
# standard behavior for the built-in activity
# LED on the Raspberry Pi. This will revert back
# to normal upon reboot.
$ echo none | sudo tee /sys/class/leds/led0/trigger
$ ssh pi@pizero.local
$ cd ~
$ mkdir sites
$ cd sites
$ git clone https://github.com/OutsourcedGuru/gpiozero-toggle-led.git
$ cd gpiozero-toggle-led
$ npm install
$ sudo DEBUG=gpiozero-toggle-led:* npm start
# You can do this from your own workstation
# with a browser if you'd like
$ open http://pizero.local:3000
```
## Exercising the code
The Express-generated website is very simple. The main index page (HTTP GET) exercises the js-gpiozero library to blink the built-in activity light on the Raspberry Pi Zero. It presents a button which will post back to the same page. On HTTP POST it will run a different function in the routes file to toggle off the same LED.

Note that the interface level of a Raspberry Pi Zero is reversed from that of a Raspberry Pi 3. So the call to gpio.LED(pin, false) has a second argument which must be called for it to work as expected.
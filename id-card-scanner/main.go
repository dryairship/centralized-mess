package main

import (
	"fmt"
	"net/http"

	"github.com/micmonay/keybd_event"
)

var kb keybd_event.KeyBonding

var charMap map[byte]int

func init() {
	charMap = make(map[byte]int)
	charMap['a'] = keybd_event.VK_A
	charMap['b'] = keybd_event.VK_B
	charMap['c'] = keybd_event.VK_C
	charMap['d'] = keybd_event.VK_D
	charMap['e'] = keybd_event.VK_E
	charMap['f'] = keybd_event.VK_F
	charMap['g'] = keybd_event.VK_G
	charMap['h'] = keybd_event.VK_H
	charMap['i'] = keybd_event.VK_I
	charMap['j'] = keybd_event.VK_J
	charMap['k'] = keybd_event.VK_K
	charMap['l'] = keybd_event.VK_L
	charMap['m'] = keybd_event.VK_M
	charMap['n'] = keybd_event.VK_N
	charMap['o'] = keybd_event.VK_O
	charMap['p'] = keybd_event.VK_P
	charMap['q'] = keybd_event.VK_Q
	charMap['r'] = keybd_event.VK_R
	charMap['s'] = keybd_event.VK_S
	charMap['t'] = keybd_event.VK_T
	charMap['u'] = keybd_event.VK_U
	charMap['v'] = keybd_event.VK_V
	charMap['w'] = keybd_event.VK_W
	charMap['x'] = keybd_event.VK_X
	charMap['y'] = keybd_event.VK_Y
	charMap['z'] = keybd_event.VK_Z
	charMap['0'] = keybd_event.VK_0
	charMap['1'] = keybd_event.VK_1
	charMap['2'] = keybd_event.VK_2
	charMap['3'] = keybd_event.VK_3
	charMap['4'] = keybd_event.VK_4
	charMap['5'] = keybd_event.VK_5
	charMap['6'] = keybd_event.VK_6
	charMap['7'] = keybd_event.VK_7
	charMap['8'] = keybd_event.VK_8
	charMap['9'] = keybd_event.VK_9
}

func pressEnter() {
	kb.SetKeys(keybd_event.VK_ENTER)
	kb.Launching()
	kb.Clear()
}

func pressKeys(code string) {
	n := len(code)
	for i := 0; i < n; i++ {
		if code[i] >= 'A' && code[i] <= 'Z' {
			kb.SetKeys(charMap[code[i]+32])
			kb.HasSHIFT(true)
		} else {
			kb.SetKeys(charMap[code[i]])
		}
		err := kb.Launching()
		if err != nil {
			panic(err)
		} else {
			kb.Clear()
		}
	}

}

func readBarcode(w http.ResponseWriter, req *http.Request) {
	barcodeValue := req.URL.Query().Get("barcodeValue")
	if barcodeValue != "null" && barcodeValue != "0" {
		fmt.Println("Pressing Keys:", barcodeValue)
		pressKeys(barcodeValue)
		pressEnter()
	}
}

func main() {
	var err error
	kb, err = keybd_event.NewKeyBonding()
	if err != nil {
		panic(err)
	}

	fs := http.FileServer(http.Dir("./frontend/dist"))
	http.Handle("/", fs)
	http.HandleFunc("/readCode", readBarcode)

	fmt.Println("Started Server")
	http.ListenAndServe(":8090", nil)
}

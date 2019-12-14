#!/usr/local/bin/env python3

##################################################
# INITIAL DIALOG BOX - GET DATA

# Ask user to enter Grower Id and paste spreadsheet contents
from tkinter import *
from tkinter import simpledialog

root = Tk()
root.withdraw()
import os
os.system('''/usr/bin/osascript -e 'tell app "Finder" to set frontmost of process "Python" to true' ''')
vGrowerId = simpledialog.askstring(title="Grain Cart Upload",
                                  prompt="Please type in the Grower Id:")
vData = simpledialog.askstring(title="Please enter spreadsheet data",
                                  prompt="Please paste all spreadsheet cells to be uploaded:")

# OPTIONAL - PASTE DIRECTLY FROM CLIPBOARD
#import pyperclip
#vData = pyperclip.paste()

# PROCESS INTO SEPARATE LINE ITEMS
vExcelLineData = vData.split('\n')
vExcelLines = len(vExcelLineData)
vExcelCells = 0
vExcelCellsSplit = []
vTicket = None


##################################################
# ADMIN SETUP

# LOGIN INFORMATION
import json
with open('/Users/jwalker/Documents/Admin/config.json','r') as f:
  config = json.load(f)
vUsername = (config['user']['name'])
vPword = (config['user']['password'])

# SELENIUM SETUP
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# CHROME OPTIONS
chrome_options = Options()
#chrome_options.add_argument("--headless")

##################################################
# MAIN SCRIPT

class webAutomation():
    def __init__(self):
        self.driver = None

    def setupSelenium(self):
        self.driver = webdriver.Chrome(options=chrome_options)

    def login(self):
        self.driver.get('https://office.conserviscorp.com')
        self.driver.execute_script("""
        document.getElementsByClassName('domain')[0].value = arguments[0];
        document.getElementsByClassName('username')[0].value = arguments[1];
        document.getElementsByClassName('password')[0].value = arguments[2];
        document.getElementById('submit').click()
        """, vGrowerId, vUsername, vPword)
        self.driver.get('https://office.conserviscorp.com/harvest/cart-ticket-create.action')

    def webFill(self, vTicket, windowNumber):
      self.driver.execute_script(open("/Users/jwalker/Documents/Scripts/Harvest/GrainCartUpload/js/grainCart_1.js").read(), vTicket)
      self.driver.execute_script(open("/Users/jwalker/Documents/Scripts/Harvest/GrainCartUpload/js/grainCart_2.js").read(), vTicket)
      self.driver.execute_script(open("/Users/jwalker/Documents/Scripts/Harvest/GrainCartUpload/js/grainCart_submit.js").read()) # HIT CREATE PLUS

    def cleanUpBrowser(self):
        self.driver.quit()

    def ExecuteTest(self):
        self.setupSelenium()
        self.login()

    def executeCells(self, x):
      vExcelCells = vExcelLineData[x]
      vExcelCellsSplit = vExcelCells.split('\t')
      self.webFill(vExcelCellsSplit, x)


############# EXECUTION ###############
if __name__ == "__main__":
  taskMaster = webAutomation()
  taskMaster.ExecuteTest()
  for x in range(0,vExcelLines):
    taskMaster.executeCells(x)
    
#######################################
# FINAL ALERT - UPLOAD COMPLETE

import tkinter
from tkinter import messagebox
root = tkinter.Tk()
root.withdraw()
taskMaster.cleanUpBrowser() # Close browser
os.system('''/usr/bin/osascript -e 'tell app "Finder" to set frontmost of process "Python" to true' ''')
messagebox.showinfo("Title", "UPLOAD COMPLETE")


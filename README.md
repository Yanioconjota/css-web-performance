# Optimizing web performance and critical rendering path

## Prerequisites

- *Option 1:* Install all the required tools and configurations using Microsoft's windows-build-tools by running `npm install -g windows-build-tools` from an elevated PowerShell (run as Administrator).

- *Option 2:* Install dependencies and configuration manually
  - Install Visual C++ Build Environment: [Visual Studio Build Tools](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools) (using "Visual C++ build tools" workload) or Visual Studio 2017 Community (using the "Desktop development with C++" workload)

  - Install [Python 2.7](https://www.python.org/downloads/release/python-2718/) (v3.x.x is not supported), and run `npm config set python python2.7`

  - Launch cmd, `npm config set msvs_version 2017`

## Run:
- Install [nodejs](https://nodejs.org/en/)
- Check npm (node package manager) is installed via command prompt: npm
- Install npm: `npm install`
- Install gulp: `npm install gulp --global`
- Run gulp: `gulp`
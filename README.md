# AgeScope

100% in-browser age detection using [face-api.js](https://github.com/justadudewhohacks/face-api.js). No backend, no API keys, no data leaves the device.

---

## Setup (2 steps)

### 1. Download the model files

You need **two models** from the face-api.js repo. Download these files and put them in the `models/` folder:

**Option A — Download script (run in terminal):**
```bash
mkdir -p models
BASE="https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights"

# SSD MobileNet (face detector)
curl -L "$BASE/ssd_mobilenetv1_model-weights_manifest.json" -o models/ssd_mobilenetv1_model-weights_manifest.json
curl -L "$BASE/ssd_mobilenetv1_model-shard1"                -o models/ssd_mobilenetv1_model-shard1
curl -L "$BASE/ssd_mobilenetv1_model-shard2"                -o models/ssd_mobilenetv1_model-shard2

# Age & Gender Net
curl -L "$BASE/age_gender_model-weights_manifest.json"      -o models/age_gender_model-weights_manifest.json
curl -L "$BASE/age_gender_model-shard1"                     -o models/age_gender_model-shard1
```

**Option B — Download manually:**
Go to https://github.com/justadudewhohacks/face-api.js/tree/master/weights
and download these 5 files into your `models/` folder:
- `ssd_mobilenetv1_model-weights_manifest.json`
- `ssd_mobilenetv1_model-shard1`
- `ssd_mobilenetv1_model-shard2`
- `age_gender_model-weights_manifest.json`
- `age_gender_model-shard1`

### 2. Your folder structure should look like this:

```
agescope/
├── index.html
└── models/
    ├── ssd_mobilenetv1_model-weights_manifest.json
    ├── ssd_mobilenetv1_model-shard1
    ├── ssd_mobilenetv1_model-shard2
    ├── age_gender_model-weights_manifest.json
    └── age_gender_model-shard1
```

---

## Running locally

You need a local server (browsers block file:// model loading):

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .

# VS Code
# Install "Live Server" extension → right-click index.html → Open with Live Server
```

Then open http://localhost:8080

---

## Deploy to GitHub Pages

1. Push the whole folder (including `models/`) to a GitHub repo
2. Go to **Settings → Pages → Source → Deploy from branch → main / root**
3. Done — live at `https://yourusername.github.io/agescope`

> The models folder is ~7MB total, well within GitHub's limits.

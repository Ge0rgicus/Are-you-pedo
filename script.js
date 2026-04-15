const img = document.getElementById("preview");
const canvas = document.getElementById("overlay");
const fileInput = document.getElementById("fileInput");

async function loadModels() {
  const MODEL_URL = "https://justadudewhohacks.github.io/face-api.js/models";
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);
}

loadModels();

fileInput.addEventListener("change", async () => {
  const file = fileInput.files[0];
  if (!file) return;

  img.src = URL.createObjectURL(file);

  img.onload = async () => {
    canvas.width = img.width;
    canvas.height = img.height;
    img.style.display = "block";

    const options = new faceapi.TinyFaceDetectorOptions({
      inputSize: 256,
      scoreThreshold: 0.5
    });

    const detections = await faceapi
      .detectAllFaces(img, options)
      .withAgeAndGender();

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    detections.forEach(det => {
      const { age, gender, genderProbability } = det;
      const box = det.detection.box;

      ctx.strokeStyle = "lime";
      ctx.lineWidth = 3;
      ctx.strokeRect(box.x, box.y, box.width, box.height);

      const label = `${age.toFixed(0)} yrs, ${gender} (${(genderProbability * 100).toFixed(0)}%)`;

      ctx.fillStyle = "black";
      ctx.fillRect(box.x, box.y - 22, ctx.measureText(label).width + 10, 22);

      ctx.fillStyle = "lime";
      ctx.fillText(label, box.x + 5, box.y - 5);
    });
  };
});

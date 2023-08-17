const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");

const { PDFDocument, rgb, degrees } = PDFLib;


// const capitalize = (str, lower = false) =>
//   (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
//     match.toUpperCase()
//   );

// submitBtn.addEventListener("click", () => {
//   const val = capitalize(userName.value);

//   //check if the text is empty or not
//   if (val.trim() !== "" && userName.checkValidity()) {
//     // console.log(val);
//     generatePDF(val);
//   } else {
//     userName.reportValidity();
//   }
// });

const generatePDF = async (name, lname, location, date) => {
  const existingPdfBytes = await fetch("./cert1.pdf").then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //get font
  const fontBytes = await fetch("./Sanchez-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );

  // Embed our custom font in the document
  const SanChezFont = await pdfDoc.embedFont(fontBytes);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Draw a string of text diagonally across the first page
  firstPage.drawText(name, {
    x: 205,
    y: 327,
    size: 24,
    font: SanChezFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(lname, {
    x: 530,
    y: 303,
    size: 24,
    font: SanChezFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(location, {
    x: 350,
    y: 275,
    size: 24,
    font: SanChezFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(date, {
    x: 380,
    y: 228,
    size: 24,
    font: SanChezFont,
    color: rgb(0, 0, 0),
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  //const pdfBytes = await pdfDoc.save();

  const uri = await pdfDoc.saveAsBase64({dataUri: true});
  document.querySelector("#myCert").src = uri;
  console.log("Done creating");

  // this was for creating uri and showing in iframe

  // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  // document.getElementById("pdf").src = pdfDataUri;

  // var file = new File(
  //   [pdfBytes],
  //   "Padhega India Subscription Certificate.pdf",
  //   {
  //     type: "application/pdf;charset=utf-8",
  //   }
  // );
// saveAs(file);
};
generatePDF("Vineet Mourya", "Lok Sabha", "New Delhi", "18-08-2023");

// init();

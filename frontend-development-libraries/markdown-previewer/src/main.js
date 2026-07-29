import "./style.scss";
import $ from "jquery";
import { marked } from "marked";
import DOMPurify from "dompurify";

marked.use({
  gfm: true,
  breaks: true
})

const handleInput = (event) => {
  const userInput = $("#editor").val();

  renderPreview(userInput);
}

const renderPreview = (input) => {
  // replace special ZERO WIDTH unicode characters
  const cleanedInput = input
    .replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "");

  const markdownContent = marked.parse(cleanedInput);

  $("#preview").html(DOMPurify.sanitize(markdownContent));
}

$(function () {
  $("#editor").on("input", handleInput);
});

renderPreview($("#editor").val());
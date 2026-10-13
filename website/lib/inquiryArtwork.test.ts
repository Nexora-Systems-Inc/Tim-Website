import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildInquiryEmail, findInquiryArtwork } from "./inquiryMail.ts";

const visitor = {
  name: "Jean Test",
  email: "jean@example.com",
  phone: "514-555-0100",
  subject: "Acquisition d'une œuvre",
  message: "Bonjour, cette toile m'intéresse <beaucoup>.",
};

describe("painting inquiry artwork details", () => {
  it("renders an available painting from the catalogue", () => {
    const e = buildInquiryEmail({ ...visitor, artwork: "C-0028" });
    assert.match(e.subject, /œuvre MER-VEILLE — C-0028/);
    assert.match(e.text, /\nMER-VEILLE — C-0028\n/);
    for (const line of ["Titre: MER-VEILLE", "Référence: C-0028", "Année: 2026", "Médium: Acrylique", 'Dimensions: 18" × 18"', "Prix: 400 $", "Statut: Disponible"]) {
      assert.ok(e.text.includes(line), line);
    }
    assert.match(e.html, /MER-VEILLE — C-0028/);
    assert.match(e.html, /400 \$/);
    assert.doesNotMatch(e.html, /<img|\.webp/);
  });

  it("shows sold status and omits empty fields", () => {
    const e = buildInquiryEmail({ ...visitor, artwork: "C-0027" });
    assert.match(e.text, /Saint-Jean-Baptiste — C-0027/);
    assert.match(e.text, /Statut: VENDU \(Sold\)/);
    assert.doesNotMatch(e.text, /Prix:|Médium:|Dimensions:|Disponible/);
  });

  it("keeps visitor details intact and separated", () => {
    const e = buildInquiryEmail({ ...visitor, artwork: "C-0028" });
    const [art, person] = e.text.split("=== VISITEUR ===");
    assert.ok(art.includes("=== ŒUVRE CONCERNÉE ==="));
    for (const v of ["Nom: Jean Test", "Courriel: jean@example.com", "Téléphone: 514-555-0100", "Objet: Acquisition d'une œuvre", visitor.message]) {
      assert.ok(person.includes(v), v);
    }
    assert.match(e.html, /mailto:jean@example.com/);
    assert.match(e.html, /&lt;beaucoup&gt;/);
  });

  it("resolves by ref only and never pulls another painting", () => {
    assert.equal(findInquiryArtwork("C-0005")?.title, "FEES NOCTURNES");
    assert.equal(findInquiryArtwork("c-0028"), null);
    const e = buildInquiryEmail({ ...visitor, artwork: "C-9999" });
    assert.match(e.text, /Référence: C-9999/);
    assert.match(e.text, /introuvable/);
    assert.doesNotMatch(e.text, /Titre:|Prix:|MER-VEILLE/);
  });

  it("leaves general contact output unchanged", () => {
    const e = buildInquiryEmail({ ...visitor, artwork: "" });
    assert.equal(e.subject, "Demande — mlalondeartistepeintre.ca — Acquisition d'une œuvre");
    assert.ok(e.text.includes("Œuvre: —"));
    assert.doesNotMatch(e.text, /===/);
  });
});

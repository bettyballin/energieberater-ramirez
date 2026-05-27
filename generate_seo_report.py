"""Generate a short, friendly German SEO report PDF (du-form)."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT, TA_JUSTIFY, TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from datetime import date
import os

# TTF fonts for proper German umlauts
FONT_REG, FONT_BOLD = "Helvetica", "Helvetica-Bold"
for reg, bold in [
    (r"C:\Windows\Fonts\arial.ttf", r"C:\Windows\Fonts\arialbd.ttf"),
    (r"C:\Windows\Fonts\calibri.ttf", r"C:\Windows\Fonts\calibrib.ttf"),
]:
    if os.path.exists(reg) and os.path.exists(bold):
        pdfmetrics.registerFont(TTFont("Body", reg))
        pdfmetrics.registerFont(TTFont("Body-Bold", bold))
        FONT_REG, FONT_BOLD = "Body", "Body-Bold"
        break

PRIMARY = HexColor("#2A5C8B")
PRIMARY_DARK = HexColor("#1E4A6B")
ACCENT = HexColor("#FFA040")
TEXT = HexColor("#1f2937")
MUTED = HexColor("#6b7280")
LIGHT_BG = HexColor("#f3f5f8")
LIGHT_BORDER = HexColor("#dde3eb")

OUTPUT = "SEO-Bericht-Energieberater-Ramirez.pdf"

# ---------- Styles ----------
h_title = ParagraphStyle("h_title", fontName=FONT_BOLD, fontSize=24, leading=28,
                         textColor=PRIMARY_DARK, spaceAfter=2)
h_sub = ParagraphStyle("h_sub", fontName=FONT_REG, fontSize=10, leading=13,
                       textColor=MUTED, spaceAfter=12)
h_sec = ParagraphStyle("h_sec", fontName=FONT_BOLD, fontSize=14, leading=18,
                       textColor=PRIMARY, spaceBefore=10, spaceAfter=4)
h_item = ParagraphStyle("h_item", fontName=FONT_BOLD, fontSize=10.5, leading=14,
                        textColor=PRIMARY_DARK, spaceAfter=1)
body = ParagraphStyle("body", fontName=FONT_REG, fontSize=9.5, leading=13,
                      textColor=TEXT, spaceAfter=0)
quote = ParagraphStyle("quote", fontName=FONT_REG, fontSize=10, leading=14,
                       textColor=TEXT, alignment=TA_JUSTIFY)
chip = ParagraphStyle("chip", fontName=FONT_BOLD, fontSize=8.5, leading=11,
                      textColor=PRIMARY_DARK, alignment=TA_CENTER)


def chip_grid(items, cols=3):
    rows, row = [], []
    for it in items:
        row.append(Paragraph(it, chip))
        if len(row) == cols:
            rows.append(row); row = []
    if row:
        while len(row) < cols:
            row.append("")
        rows.append(row)
    tbl = Table(rows, colWidths=[5.45 * cm] * cols, hAlign="LEFT")
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_BG),
        ("BOX", (0, 0), (-1, -1), 0.4, LIGHT_BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.4, LIGHT_BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    return tbl


def item_row(title_text, desc):
    cell = [Paragraph(title_text, h_item), Paragraph(desc, body)]
    tbl = Table([[cell]], colWidths=[16.4 * cm])
    tbl.setStyle(TableStyle([
        ("LINEBEFORE", (0, 0), (-1, -1), 2.5, PRIMARY),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return tbl


def on_page(canvas, doc):
    canvas.saveState()
    w, h = A4
    canvas.setFillColor(PRIMARY)
    canvas.rect(0, h - 10, w, 10, fill=1, stroke=0)
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT_REG, 8)
    canvas.drawString(2 * cm, 1.2 * cm, "Energieberater Ramirez · SEO-Kurzbericht")
    canvas.drawRightString(w - 2 * cm, 1.2 * cm, f"Seite {doc.page}")
    canvas.restoreState()


doc = SimpleDocTemplate(
    OUTPUT, pagesize=A4,
    leftMargin=2 * cm, rightMargin=2 * cm,
    topMargin=1.8 * cm, bottomMargin=1.8 * cm,
    title="SEO-Kurzbericht Energieberater Ramirez",
)

story = []
story.append(Paragraph("SEO-Kurzbericht", h_title))
story.append(Paragraph(
    f"energieberater-ramirez.de · {date.today().strftime('%d.%m.%Y')}", h_sub))

# Intro (one sentence, du-form)
intro = Table([[Paragraph(
    "Hier ist der Überblick: was an der Website gemacht wurde, damit du bei "
    "Google besser gefunden wirst — und was als Nächstes Sinn macht.", quote,
)]], colWidths=[16.4 * cm])
intro.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), LIGHT_BG),
    ("LINEBEFORE", (0, 0), (-1, -1), 2.5, ACCENT),
    ("LEFTPADDING", (0, 0), (-1, -1), 10),
    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
    ("TOPPADDING", (0, 0), (-1, -1), 8),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
]))
story.append(intro)

# ---------- Was wurde gemacht ----------
story.append(Paragraph("Was wurde gemacht", h_sec))
story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY,
                          spaceBefore=2, spaceAfter=6))

items = [
    ("Suchmaschinen-Visitenkarte",
     "Jede Seite hat saubere Titel, Beschreibungen und Vorschaubilder für Google, Facebook & Co."),
    ("Eigene Seiten für die Hauptleistungen",
     "Energieausweis, Sanierungsfahrplan, Fördermittelberatung und Vor-Ort-Beratung sind jetzt jeweils eigene Unterseiten."),
    ("Schnellere Ladezeiten",
     "Bilder modern komprimiert (–95 % beim großen Hintergrund), Stylesheets gebündelt."),
    ("Häufige Fragen — schemafähig",
     "Sechs typische Fragen sind hinterlegt und können in den Google-Treffern als ausklappbare Antworten erscheinen."),
    ("Lokale Auffindbarkeit",
     "Schlüchtern, Main-Kinzig-Kreis, Frankfurt + BAFA-Zertifizierung sind klar verankert."),
    ("Sauberes Fundament",
     "Sitemap, eigene Impressum-/Datenschutz-Seiten, freundliche 404-Seite, fixiertes Logo."),
]
for t, d in items:
    story.append(item_row(t, d))
    story.append(Spacer(1, 3))

# ---------- Empfehlungen ----------
story.append(Spacer(1, 6))
story.append(Paragraph("Was du als Nächstes tun kannst", h_sec))
story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY,
                          spaceBefore=2, spaceAfter=6))

story.append(Paragraph("Hoher Hebel:", h_item))
story.append(chip_grid([
    "Google Unternehmensprofil",
    "Kundenbewertungen sammeln",
    "BAFA-/GIH-Eintrag pflegen",
    "Lokale Branchenbücher",
    "Sitemap bei Google anmelden",
    "Eintrag bei Bing",
]))
story.append(Spacer(1, 6))

story.append(Paragraph("Mittlerer Hebel:", h_item))
story.append(chip_grid([
    "Ratgeber-Artikel schreiben",
    "Weitere Leistungs-Seiten",
    "Referenzen / Kundenstimmen",
    "Foto-Galerie der Projekte",
    "Verlinkungen von Partnern",
    "Newsletter",
]))
story.append(Spacer(1, 8))

# Closing
closing = Table([[Paragraph(
    "<b>Bottom line:</b> die Technik sitzt. Die nächsten echten Sprünge "
    "kommen jetzt von <b>außen</b> — Google-Profil, Bewertungen, Partner-"
    "Links. Das ist nichts mehr was ich auf der Seite machen kann.",
    body,
)]], colWidths=[16.4 * cm])
closing.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, -1), LIGHT_BG),
    ("LINEBEFORE", (0, 0), (-1, -1), 2.5, ACCENT),
    ("LEFTPADDING", (0, 0), (-1, -1), 10),
    ("RIGHTPADDING", (0, 0), (-1, -1), 10),
    ("TOPPADDING", (0, 0), (-1, -1), 8),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
]))
story.append(closing)

doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
print(f"Created: {OUTPUT}  ({os.path.getsize(OUTPUT)/1024:.1f} KB)")

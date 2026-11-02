# Skill: Patent Mining

DATABASES:
- Google Patents (patents.google.com) — fastest full-text, auto-translation
- Espacenet (worldwide.espacenet.com) — legal status per country
- WIPO Patentscope (patentscope.wipo.int) — PCT applications
- Lens.org — citation mapping (who builds on whom)
- KIPRIS (patent.go.kr) for KR; CNIPA / pss-system.cponline.cnipa.gov.cn for CN;
  INPI (inpi.fr) for FR/BR-derived; freepatentsonline.com for US

SEARCH STRATEGY:
1. CPC class B09B 3/70 (chemical treatment of solid waste) + keywords
2. Keyword sets: EN "cigarette butt recycling", "cellulose acetate recovery
   filter", "cigarette waste depollution"; FR "recyclage mégots procédé";
   PT "reciclagem bitucas"; ZH "烟头 回收 醋酸纤维素"; JA "タバコの吸い殻 リサイクル";
   KO "담배꽁초 재활용"; TR "sigara izmariti geri dönüşüm"; ES "colillas reciclaje"
3. Follow the citations: every patent's "cited by" and "citations" lists
   (this uncovered ~10 entries in our first pass)
4. Search assignee names of known players for additional families

EXTRACTION per patent:
- Number, jurisdiction, assignee, inventor, priority + grant dates
- CLAIMS (the legal boundary — read first)
- Disclosed parameters: temps, pressures, times, ratios, equipment
- Legal status per country: granted / pending / lapsed / abandoned / expired
  (patents expire 20y from filing; abandoned/expired = free to use)

RULES: record everything, filter nothing. Never treat a paywalled abstract
as the full disclosure — fetch the document. Flag machine translations.

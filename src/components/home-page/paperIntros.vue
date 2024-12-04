<template>
  <div class="paper-intros">
    <div v-for="(paper,index) in papers" :key="index" class="paper-container">
      <h2 class="paper-title">{{ paper.title }}</h2>
      <p class="paper-author">作者: <span>{{ paper.authors.join(', ') }}</span></p>
      <p class="paper-author">期刊: <span>{{ paper.journal }}</span></p>
      <p class="paper-summary">{{ paper.abstract }}</p>
      <div class="paper-details">
        <p class="paper-year">年份: <span>{{ paper.year }}</span></p>
        <p class="paper-citations">引用次数: <span>{{ paper.citationCount }}</span></p>
        <p class="paper-field">领域: <span>{{ paper.fields.join(', ') }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PaperDetails",
  data(){
    return{
      papers:[{
        "citationCount": 55,
        "journal": "American Journal of Physical Anthropology",
        "year": 2013,
        "id": "https://openalex.org/W1497229422",
        "abstract": "ABSTRACT Popular media reports concerning the causes of the current global obesity pandemic and its related sequelae—the cardiometabolic syndrome—are often couched in terms of dramatic changes in diet and lifestyle around the world; namely, drastically increasing dietary intakes of high energy foods and plummeting levels of daily physical activity—the hallmarks of the so called “nutrition transition.” Far less attention is generally drawn to the important role phenotypic plasticity during early life (i.e., “developmental programming”) plays in the cardiometabolic health crisis. Recently, however, researchers working within the field of the developmental origins of health and disease (DOHaD) and epigenetics have extended our understanding of the role played by these developmental processes and capacities in health and disease even further by investigating the transmissible nature of developmentally programmed cardiometabolic traits to subsequent generations. In this review, after briefly revisiting the fundamental discoveries of first‐generation DOHaD research, I consider how recent discoveries regarding the transmissibility of developmentally acquired traits are providing new insights into the current global cardiometabolic pandemic, and how a better understanding of developmental programming—including transmissibility—are essential for the conceptualization and implementation of public health initiatives aimed at stemming this global health crisis. Am J Phys Anthropol 57:79–93, 2013. © 2013 Wiley Periodicals, Inc.",
        "title": "The “early life” origins of obesity‐related health disorders: New discoveries regarding the intergenerational transmission of developmentally programmed traits in the global cardiometabolic health crisis",
        "fields": [
          "Medicine",
          "Medicine",
          "Environmental Science"
        ],
        "authors": [
          "Daniel C. Benyshek"
        ]
      },
        {
          "citationCount": 0,
          "journal": "Okayama Igakkai Zasshi (Journal of Okayama Medical Association)",
          "year": 1925,
          "id": "https://openalex.org/W1517628331",
          "abstract": "As to the growth of the alimentary canal, only the length, as previously men tioned, was measured in four portions: the stomach, cecum (including appendix ver miform) and small and large intestines. The weight was disregarded as it is very in determinable on account of the content in the canal and moreover, its width is also indefinite. Hatai3 stated that the weight of the alimetary tract is represented by the following formula in albino rat: Weight of alimentary tract =0.0245Body-weight+4.720Log(Body-weight+7)-5 .753. The distance between the cardiac and the pylorus was measured for the stomach length and the content in the stomach was untouched. This measuring may not be proper, but the stomach of such young rat is always filled with some contents nearly to the same extend and so the content will not disturb the measuring. There are se veral methods of measuring the stomach besides the above one; the length of greater curvature or lesser curvature, or the dimension of stomach etc., are also applied. On the first day after birth, the stomach is already filled with milk and its white color is clearly seen through the wall of the skin as proviously described. In the intestine, especially in the large intestine, the dark green substance, the meconium is detected. As a rule, all the portions are developed proportionately and particularly after having opened their eyes on about fifteenth day, they make remarkable progress. On this occasion, the stomach holds some content besides milk and also the intestinal contents",
          "title": "The Postnatal Growth of the Alimentary Canal and the main long Bones of the Free-Extremities in the Albino Rat (Mus Norvegicus Albinus)",
          "fields": [
            "Medicine",
            "Medicine"
          ],
          "authors": [
            "Koken Ito",
            "Masao Fujihara"
          ]
        },
        {
          "citationCount": 0,
          "journal": "IFIP advances in information and communication technology",
          "year": 2000,
          "id": "https://openalex.org/W1529460336",
          "abstract": "We consider the role of constraints in maintaining both secrecy and integrity in a multilevel secure database. In a multilevel database, certain integrity and classification constraints create a secrecy problem since data additions, deletions or modifications require accessing data at higher levels. In many cases, however, these constraints may be approximated by a series of simpler constraints, called level-valid constraints. Level-valid constraints do not require access to any data that is classified higher than the data to be modified. Moreover, they meet the integrity requirements since any database state that satisfies the level-valid constraints also satisfies the multilevel constraints. Simple tests are developed to ensure the validity of proposed level-valid constraints and these constraints are derived for common cases of multilevel constraints.",
          "title": "Enforcing Integrity while Maintaining Secrecy",
          "fields": [
            "Computer Science",
          ],
          "authors": [
            "Donald G. Marks"
          ]
        },
        {
          "citationCount": 0,
          "journal": "Applied Entomology and Zoology",
          "year": 1985,
          "id": "https://openalex.org/W1542370669",
          "abstract": "Small mammals were trapped each year from 1976 to 1984 no Kahoku-gata reclaimed land in Ishikawa Prefecture. This area, which had been covered with grassland, was gradually transformed to cultivated fields. Before cultivation started, 3 species of rodents and 1 species of insectivore were trapped. Microtus montebelli, Rattus norvegicus and Mus molossinus were abundant. After cultivation, Apodemus speciosus was added to this fauna. Microtus and Mus were as dominant as before. Three dominant species were found in all sampling plots of this area. Their level of abundance was roughly equal to that in each plot before cultivation began, but R. norvegicus was usually found near a water source. After the start of cultivation, these homogeneous patterns of distribution changed. Microtus decreased in the cultivated areas and the level of abundance in the Mus population differed. A remarkable change was found in the Rattus population in this area : this species increased from 1977 to 1979 and then rapidly disappeared. Such a pattern of fluctuation is supposed to be characteristic of a reclaimed land ecosystem.",
          "title": "Successional Change of Small Mammal Fauna on Kahoku-Gata Reclaimed Land with Agricultural Development",
          "fields": [
            "Environmental Science",
            "Biochemistry, Genetics and Molecular Biology",
          ],
          "authors": [
            "Ryoh-ichi OHGUSHI"
          ]
        },
        {
          "citationCount": 0,
          "journal": "Environmental Health Perspectives",
          "year": 2008,
          "id": "https://openalex.org/W1542410573",
          "abstract": "Vol. 116, No. 1 EnvironewsOpen AccessReproductive Toxicity: Birth Weight Raises More Questions on Seafood Safety Adrian Burton Adrian Burton Search for more papers by this author Published:1 January 2008https://doi.org/10.1289/ehp.116-a20AboutSectionsPDF ToolsDownload CitationsTrack Citations ShareShare onFacebookTwitterLinked InReddit Women who eat too much shellfish before pregnancy, particularly crabs and lobsters, may increase their chance of having babies who are small for their gestational age (SGA), report French scientists in an article posted online 24 October 2007 ahead of print in Environmental Health. Eating fish, however, seems to have the opposite effect. The findings further fuel the debate over how much and what types of fish and other seafood are beneficial to would-be moms.“Some studies suggest the omega-3 fatty acids in fish and seafood are beneficial to fetal growth and birth weight,” explains first author Laurence Guldner, an epidemiologist at the National Institute of Health and Medical Research, University of Rennes, “but others report no benefit or even a negative effect.” The new report could help explain these discrepancies, because the results distinguish between the effects of fish and shellfish, and between even more specific subcategories of seafood—something most earlier work did not do.The study included 2,398 pregnant women in Brittany, France, who were part of the Pélagie cohort assembled to investigate effects of environmental pollutants on pregnancy, birth outcomes, and child health and development. The researchers gathered information on consumption in the year prior to pregnancy of saltwater fish (e.g., salmon), mollusks (e.g., oysters), large crustaceans (e.g., lobster), and small crustaceans (e.g., shrimp).Statistical analysis, adjusted for a number of potential confounders, showed that women who ate 2 or more meals of shellfish per week had a statistically significant 2.14 greater likelihood of having an SGA baby (defined as having birth weight below the tenth percentile for a given gestational age and sex) compared with those who ate shellfish less than once per month. Those who ate fish 2 or more times per week were about half as likely to have an SGA baby than those who ate it less than once per month (a nonsignificant finding).“Most of the negative effect of seafood on SGA was [associated with] eating large crustaceans, like crabs and lobsters,” explains Guldner. He suggests that high tissue concentrations of persistent organic pollutants such as dioxins and polychlorinated biphenyls accumulated by these animals may cancel out the potential beneficial effect of their omega-3 fatty acids.Indeed, the results of some other studies have suggested that low-level exposure in utero to such pollutants may have a negative effect on birth weight. However, the evidence to date is inconclusive.“Unfortunately, no distinction was made between the fish types eaten [in this study],” cautions Thorhallur Ingi Halldorsson, a researcher at the State Serum Institute in Copenhagen, Denmark. “We should [therefore] be careful in promoting fish as beneficial for fetal growth. Oily fish is a good source of omega-3 fatty acids, but high consumption can lead to higher body burdens of organic pollutants, which might affect growth.” Halldorsson adds that regular consumption of varying fish types should therefore be encouraged.Rosa Ortega, a professor of nutrition at the Complutense University of Madrid, Spain, adds, “It would certainly be a good idea for women to make sure their seafood comes from guaranteed clean waters. But with everything in moderation, a new mother-to-be is probably still safe to satisfy her craving for a lobster dinner.”Eat now, pay later?Although it’s too soon to put the kibosh on lobster, a seafood study suggests that high crustacean consumption may be linked to low birth weight.FiguresReferencesRelatedDetails Vol. 116, No. 1 January 2008Metrics About Article Metrics Publication History Originally published1 January 2008Published in print1 January 2008 Financial disclosuresPDF download License information EHP is an open-access journal published with support from the National Institute of Environmental Health Sciences, National Institutes of Health. All content is public domain unless otherwise noted. Note to readers with disabilities EHP strives to ensure that all journal content is accessible to all readers. However, some figures and Supplemental Material published in EHP articles may not conform to 508 standards due to the complexity of the information being presented. If you need assistance accessing journal content, please contact [email protected]. Our staff will work with you to assess and meet your accessibility needs within 3 working days.",
          "title": "Reproductive Toxicity: Birth Weight Raises More Questions on Seafood Safety",
          "fields": [
            "Nursing"
          ],
          "authors": [
            "Adrian Burton"
          ]
        },
        {
          "citationCount": 4,
          "journal": "Choice Reviews Online",
          "year": 2003,
          "id": "https://openalex.org/W1543619082",
          "abstract": "List of illustrations Acknowledgements Introduction 1. Hitler 2. Barlach 3. Nordic modernism 4. The hounding of Barlach 5. German and un-German art 6. After the fact A note on the literature Notes Documents and works cited Index.",
          "title": "An artist against the Third Reich: Ernst Barlach, 1933-1938",
          "fields": [
            "Social Sciences",
          ],
          "authors": [
            "Peter Paret"
          ]
        },
        {
          "citationCount": 0,
          "journal": "Lecture notes in computer science",
          "year": 1996,
          "id": "https://openalex.org/W1746367182",
          "abstract": "An increasing number of networking applications involve multiple participants and are therefore best supported by multicasting. Where a multicast application consumes high bandwidth, it is important to minimise the effect on the network by offering economical multicast routes. Many new applications made possible by networks based on ATM involve real-time components and are therefore also delay-sensitive. This paper discusses reasonably simple techniques for multicast routing which tackle both of these constraints, that is: first, the route makes efficient use of network resources and, secondly, delays to all recipients are kept within a bound. The problem is NP-complete, so we present heuristics which build up a directed graph containing potential routing solutions and use a greedy approach to select a solution from that graph. The heuristics are discussed and evaluated and are shown to offer good results for a variety of situations including both large and small multicast groups. Our approach is also compared with a previous solution to this problem, which has a greater time complexity.",
          "title": "Low-cost ATM multicast routing with constrained delays",
          "fields": [
            "Computer Science",
          ],
          "authors": [
            "A. Gill Waters",
            "John Crawford"
          ]
        },]
    }
  }
});
</script>

<style scoped>
*{
  z-index: 100;
}
.paper-intros{
  width: auto;
  //max-width: 550px;
}
.paper-container {
  width: 100%;
  //max-width: 550px;
  margin:20px auto;
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.paper-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.paper-title {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.3;
  //word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 限制标题为 2 行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.paper-author,
.paper-summary {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

.paper-author span {
  color: #1e88e5;
}

.paper-summary {
  font-style: italic;
  color: #777;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 6; /* 限制摘要为 3 行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.paper-details {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.paper-details p {
  font-size: 14px;
  color: #555;
}

.paper-details p span {
  font-weight: 500;
  color: #333;
}

.paper-year,
.paper-citations,
.paper-field {
  display: flex;
  justify-content: space-between;
}

.paper-year span,
.paper-citations span,
.paper-field span {
  color: #4caf50;
  font-weight: bold;
}
</style>

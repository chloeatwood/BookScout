import { StyleSheet } from 'react-native';
import { colors } from './Colors';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },

  scrollView: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 110,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  greeting: {
    fontSize: 15,
    color: colors.gray,
    marginBottom: 3,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.forest,
  },

  profilePlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Search
  searchContainer: {
    height: 54,
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.dark,
    marginLeft: 10,
  },

  scanButton: {
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: colors.lightGray,
  },

  // Section Headers
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: colors.forest,
  },

  sectionAction: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.brown,
  },

  // Currently Reading
  horizontalList: {
    paddingBottom: 28,
    gap: 14,
  },

  readingCard: {
    width: 150,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  bookCover: {
    height: 150,
    borderRadius: 10,
    backgroundColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  bookTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.dark,
    lineHeight: 20,
    minHeight: 40,
  },

  author: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 3,
  },

  progressBackground: {
    height: 5,
    backgroundColor: colors.lightGray,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 12,
  },

  progressBar: {
    height: '100%',
    backgroundColor: colors.sage,
    borderRadius: 5,
  },

  progressText: {
    fontSize: 11,
    color: colors.gray,
    marginTop: 5,
  },

  // Lists
  listContainer: {
    gap: 10,
    marginBottom: 28,
  },

  listCard: {
    minHeight: 82,
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  smallBookCover: {
    width: 58,
    height: 62,
    borderRadius: 9,
    backgroundColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
  },

  wishlistCover: {
    backgroundColor: colors.sage,
  },

  listInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  listTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.dark,
  },

  store: {
    fontSize: 11,
    color: colors.gray,
    marginTop: 5,
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.forest,
  },
})